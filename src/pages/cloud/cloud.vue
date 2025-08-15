<route lang="jsonc" type="page">
{
  "layout": "tabbar",
  "style": {
    "navigationStyle": "custom"
  }
}
</route>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchKeyword = ref('');

// 模拟数据
const groups = [
  { id: 1, title: '水电站数据展示', icon: 'https://placehold.co/100x100', description: '模拟科技' },
  { id: 2, title: 'SACADA动画', icon: 'https://placehold.co/100x100', description: '模拟科技' },
  // ... other group data ...
];

function handleSearch() {
  // 处理搜索逻辑
}

function handleGroupClick(group) {
  // 跳转到组态详情页
  router.push({ name: 'groupDetail', params: { groupId: group.id } });
}
</script>

<template>
  <Navbar
    title="云组态"
    :showBack="false"
    background="#2EA4FF"
    color="#ffffff"
  />
  <view class="cloud-page">
    <EChartsComponent />
    <!-- 搜索框 -->
    <van-search v-model="searchKeyword" placeholder="关键字搜索" show-action>
      <template #action>
        <button @click="handleSearch">查询</button>
      </template>
    </van-search>

    <!-- 统计信息 -->
    <div class="stats">
      <span><span class="dot blue"></span>总计 50</span>
      <span><span class="dot orange"></span>已用 35</span>
      <span><span class="dot red"></span>剩余 15</span>
    </div>

    <!-- 组态列表 -->
    <van-grid :column-num="2" gutter="10">
      <van-grid-item v-for="group in groups" :key="group.id" @click="handleGroupClick(group)">
        <van-image :src="group.icon" />
        <div class="group-title">{{ group.title }}</div>
        <div class="group-description">{{ group.description }}</div>
      </van-grid-item>
    </van-grid>
  </view>
</template>

<style lang="scss" scoped>
.cloud-page {
  padding: 10px;

  .stats {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;

    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 5px;
    }

    .blue {
      background-color: blue;
    }

    .orange {
      background-color: orange;
    }

    .red {
      background-color: red;
    }
  }

  .van-grid {
    .van-grid-item {
      text-align: center;

      .van-image {
        width: 100%;
        height: 100px;
      }

      .group-title {
        font-size: 16px;
        margin-top: 10px;
      }

      .group-description {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>
