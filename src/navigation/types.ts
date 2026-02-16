export type NavigatorScreenParams<ParamList extends {}> =
  | { screen?: never; params?: never }
  | {
      [K in keyof ParamList]: undefined extends ParamList[K]
        ? { screen: K; params?: ParamList[K] }
        : { screen: K; params: ParamList[K] };
    }[keyof ParamList];

export type HomeStackParamList = {
  Home: undefined;
  CaseDetail: { caseId: string };
};

export type ExploreStackParamList = {
  Explore: undefined;
  Category: { category: string };
};

export type ConsultingStackParamList = {
  ConsultingHome: undefined;
  IdeaInput: { ideaId?: string };
  ConsultingResult: { sessionId: string };
  ConsultingHistory: undefined;
  ChecklistProgress: { sessionId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  Support: undefined;
  Version: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUpComplete: undefined;
};

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>;
  ConsultingTab: NavigatorScreenParams<ConsultingStackParamList>;
  SavedTab: undefined;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
