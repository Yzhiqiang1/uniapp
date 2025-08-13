


// 验证是否登录
export function userSignIn() {

}

//获取accessToken
export function getAccessToken() {
    
}

//是否创建websocket连接
export function initSocket() {
    
}

 ///创建websocket连接并监听状态
export function openWebsocket() {
    
}

// 连接失败从新连接
export function reconnect() {
    
}

//退出登录
export function signOut() {
    
}

/**
 * 字符串转Base64 编码
 */
export function srtToBase64(srt: string) {
  if (srt) {
    try {
      // 使用 TextEncoder 将字符串编码为 UTF-8 格式的 Uint8Array
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(srt);

      // 将 Uint8Array 转换为 Base64 字符串
      const binaryString = String.fromCharCode.apply(null, uint8Array as any);
      return btoa(binaryString);
    } catch (e) {
      console.error('Error encoding password:', e);
      return ''
    }
  } else {
    return ''
  }
}
/**
 * Base64 编码转字符串
 */
export function base64Decode(srt: string | null) {
  try {
    const decoder = new TextDecoder();
    const binaryString = atob(srt!);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return decoder.decode(uint8Array);
  } catch (e) {
    console.error('Error decoding password:', e);
    return ''
  }
}