import * as SecureStore from "expo-secure-store";


const KEYS = {
    ACCESS_TOKEN:"accessToken",
    REFRESH_TOKEN:"refreshToken"
}

export const storage = {
    async setTokens(accessToken:string,refreshToken:string){
        await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN,accessToken);
        await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN,refreshToken);
    },
   async getAccessToken(){
    return SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
   },
    async getRefreshToken(){
     return SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
    },
    async clearTokens(){
        await SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN);
        await SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN);
    }
}
