import {API_URL, API_PREFIX} from '@env';
import {getAccessToken} from '@screens/auth/auth';

export interface SSEEvent {
  phase: string;
  data?: any;
  chunk?: string;
}

type SSECallback = (event: SSEEvent) => void;
type SSEErrorCallback = (error: Error) => void;

interface SSEConnection {
  abort: () => void;
  sessionId: string | null;
}

export async function connectSSE(
  endpoint: string,
  body: Record<string, any>,
  onEvent: SSECallback,
  onError: SSEErrorCallback,
  onComplete: () => void,
): Promise<SSEConnection> {
  const token = await getAccessToken();
  const url = `${API_URL}${API_PREFIX}${endpoint}`;

  const xhr = new XMLHttpRequest();
  let lastIndex = 0;
  let buffer = '';
  let sessionId: string | null = null;

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'text/event-stream');
  if (token) {
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  }

  xhr.onreadystatechange = () => {
    // 헤더 수신 시 세션 ID 추출
    if (xhr.readyState >= 2) {
      const xSessionId = xhr.getResponseHeader('X-Session-Id');
      if (xSessionId) {
        sessionId = xSessionId;
      }
    }
  };

  xhr.onprogress = () => {
    const newData = xhr.responseText.substring(lastIndex);
    lastIndex = xhr.responseText.length;

    buffer += newData;
    const parts = buffer.split('\n\n');
    // 마지막 부분은 아직 불완전할 수 있으므로 버퍼에 보관
    buffer = parts.pop() || '';

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) {
        continue;
      }

      for (const line of trimmed.split('\n')) {
        if (line.startsWith('data: ')) {
          try {
            const json = JSON.parse(line.substring(6));
            onEvent(json);
          } catch (e) {
            console.warn('SSE parse error:', line);
          }
        }
      }
    }
  };

  xhr.onload = () => {
    // 남은 버퍼 처리
    if (buffer.trim()) {
      for (const line of buffer.trim().split('\n')) {
        if (line.startsWith('data: ')) {
          try {
            const json = JSON.parse(line.substring(6));
            onEvent(json);
          } catch (e) {
            console.warn('SSE parse error (final):', line);
          }
        }
      }
    }
    onComplete();
  };

  xhr.onerror = () => {
    onError(new Error(`SSE connection failed: ${xhr.status}`));
  };

  xhr.ontimeout = () => {
    onError(new Error('SSE connection timed out'));
  };

  // AI 분석이 오래 걸릴 수 있으므로 타임아웃을 넉넉하게
  xhr.timeout = 180000;
  xhr.send(JSON.stringify(body));

  return {
    abort: () => xhr.abort(),
    get sessionId() {
      return sessionId;
    },
  };
}
