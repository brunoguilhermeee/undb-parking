import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IStorage {
  getItem<Result>(key: string): Promise<Result | null>;
  setItem(key: string, value: string): Promise<void>;
}

export class AppAsyncStorage implements IStorage {
  async getItem<Result>(key: string): Promise<Result | null> {
    return (await AsyncStorage.getItem(key)) as Result | null;
  }
  async setItem(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }
}
