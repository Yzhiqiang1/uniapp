<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "我的"
  }
}
</route>

<script lang="ts" setup>
// 识别二维码
    uni.scanCode({
        success: function(res) {

        }
    })
    uni.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: function (res) {
            const tempFilePath = res.tempFilePaths[0];
        },
    })
</script>

<template>
  <view class=""></view>
</template>

<style lang="scss" scoped>
//
</style>
