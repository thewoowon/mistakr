import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  Home: undefined;
  CaseDetail: { caseId: string };
};

export type ExploreStackParamList = {
  Explore: undefined;
  Category: { category: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  Support: undefined;
  Version: undefined;
};

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>;
  SavedTab: undefined;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
