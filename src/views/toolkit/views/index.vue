<template>
  <div>
    <div class="level-title">基本</div>
    <div class="card-container">
      <div class="toolkit-item" v-for="item in baseToolkitList" :key="item.toolCode" bindtap="goToolkitItem">
        <img round :src="item.picFullPath" />
        <div class="toolkit-name">{{ item.toolName }}</div>
      </div>
    </div>

    <div class="level-title">高级</div>
    <div class="card-container">
      <div class="toolkit-item" v-for="item in seniorToolkitList" :key="item.toolCode" bindtap="goToolkitItem">
        <van-image round :src="item.picFullPath" />
        <div class="toolkit-name">{{ item.toolName }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseToolkitList = [
  {
    createTime: "2022-08-23 17:42:39",
    createUser: null,
    delFlag: false,
    id: 1,
    picFullPath:
      "https://xom-cms-a-oss001.oss-cn-shanghai.aliyuncs.com/toolkit/file/fb74a7ac40264bc187f0a8273741e258/config-icon1.png?Expires=1665733508&OSSAccessKeyId=STS.NTFsvLZHk1J1v3ct8hKmp8UXE&Signature=V9axjMGes6ZdgHzTltp36HVNFP8%3D&security-token=CAISzgN1q6Ft5B2yfSjIr5fzOMz4t5dKhojadBXSkDg9R%2BJc15Dzpzz2IHpEeXlpCOEesPQ%2Bm21S5%2FwflqN5EZVAXkDccMJstjK2EsZ0O9ivgde8yJBZolDPewHKeaKSvqL7Z%2BH%2BU6naGJOEYEzFkSle2KbzcS7YMXWuLZyOj%2BxYDLkUWxLqL1gjA8xNdDN%2FtOgQN3baKZTINQXx0EXdEG1iuAd3lQEY7r%2BkkOmd8Qb5hl%2F3wfMOxeH2OYP2QMRwFop0UNqpvpRxbbGT%2FyNMwQVB96pqpadAgwWl2OuQGF5M%2BR6LHvPJ%2B9l0Vm9Da7M9BrRPoYqq94lxsfeBkJ%2FsmVQff7NFVCGaT4W7hcKBH%2Fiybo5gF8DyMG%2Bf1cuUZNun8VE0ZndePwZRPtNkLWRrUUR1DXOoC83K0VTOZRjZPMrh%2Baoq0J1z4kz19N6RXTamSKmY1iBqVf1RbEYzZVxsqg6HSKIddBFWeF5KHqucSZ4JDCpTsqT1pwbfJEYCpzN1x6SuP66P6vpEMNqlBc0Xi9QnCc4Y4zdwfTPeUKmzj0oYTmthTItN3bPlUZ3Fs%2BXVnbXKML%2BeVKBW5QgAIGqMtUuXQHZXNjbq%2BsYzp59oBXAAPscagAFvtI0GCvixrPpQ6KH7t7OFjY3xrraCSRQVc%2BTKaJakFuOb8%2FyLssHr4MayY%2BNavEHNcFRMKvoYHrS2w6BqBmCvxn8Pn09xUUb6raKHnCezsaX3ajer7Z%2BmAqQQ%2FctYtwaSOZF3S9lsoJ2rrJ2HQlLhYiu7C3VgRkILD5hURGNrTg%3D%3D",
    picPath: "toolkit/file/4de72b9235884bbcb15b4bedf3b4c7f1/config-icon1.png",
    target: "1,2,0",
    toolCode: "IsoForNasTable",
    toolName: "ISO清洁度和NAS换算对照表",
    toolType: "0",
    updateTime: "2022-09-15 15:29:31",
    updateUser: "8858",
  },
];
const seniorToolkitList = [
  {
    createTime: "2022-08-23 17:42:39",
    createUser: null,
    delFlag: false,
    id: 1,
    picFullPath:
      "https://xom-cms-d-oss001.oss-cn-shanghai.aliyuncs.com/toolkit/file/4de72b9235884bbcb15b4bedf3b4c7f1/config-icon1.png?Expires=1665733000&OSSAccessKeyId=STS.NUDEmBAQgtFc4Toc4wt3vZyLS&Signature=ID7zCZY9Vy8GRF0BUBJUscm7Z9Y%3D&security-token=CAISzgN1q6Ft5B2yfSjIr5bxDtf2rI5Gw4SINnLehzQieLxatbznsTz2IHpEeXlpCOEesPQ%2Bm21S5%2FwflqN5EZVAXkDcYcZutiHiRMd0O9ivgde8yJBZolDPewHKeaKSvqL7Z%2BH%2BU6naGJOEYEzFkSle2KbzcS7YMXWuLZyOj%2BxYDLkUWxLqL1gjA8xNdDN%2FtOgQN3baKZTINQXx0EXdEG1iuAd3lQEY7r%2BkkOmd8Qb5hl%2F3wfMOxeH2OYP2QMRwFop0UNqpvpRxbbGT%2FyNMwQVB96pqpadAgwWl2OuQGF5M%2BR6LHvPJ%2B9l0Vm9Da7M9BrRPoYqq94lxsfeBkJ%2FsmVQff7NFVCGaT4W7hceBH%2Fiybo5gF8DyMG%2Bf1cuUZNun8VE0ZndePwZRPtZkLWRrUUR1DXOoC83K0VTOZRjZPMrh%2Baoq0J1z4kz19N6RXTamSKmY1iBqVf1RbEYzZVxsqg6HSKIddBFWeF5KHqucSZ4JDCpTsqT1pwbfJEYCpzN1x6SuP66P6vpEMNqlBc0Xi9QnCc4Y4zdwfTPeUKmzj0oYTmthTItN3bPlUZ3Fs%2BXVnbXKML%2BeVKBW5QgAIGqMtUuXQHZXNjbq%2BsYzp59oBXAAPscagAEND4A0tzqbjgCm3AGtuI%2FmJIdvtiUf%2FqlQ%2B2pjGq3xGbypIxCVaN6irCIuLYdxmPRH6KP6NEhccppXUlWOPHLNsYrzFS0AjkZz%2Fr20Sp1XCWDRLQ3lAixjhBKoy9OF4myqyK%2FUhPKK4Kzm%2FKw2xjRP4RbBAJr8IN5xRJbywPAXUQ%3D%3D",
    picPath: "toolkit/file/4de72b9235884bbcb15b4bedf3b4c7f1/config-icon1.png",
    target: "1,2,0",
    toolCode: "IsoForNasTable",
    toolName: "ISO清洁度和NAS换算对照表",
    toolType: "0",
    updateTime: "2022-09-15 15:29:31",
    updateUser: "8858",
  },
];
</script>

<style lang="scss" scoped>
.level-title {
  width: 100%;
  height: 80x;
  padding: 10px 20px;
  font-weight: bolder;
}
.title-bar {
  height: 120rpx;
  width: 100%;
  padding: 0 20rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #000000;
  font-family: "PingFang SC";
  font-weight: 700;
}

.card-container {
  width: 90%;
  margin: 0 auto;
  padding: 20rpx;
  min-height: 100rpx;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
}

.toolkit-item {
  width: 25%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.toolkit-name {
  width: 120rpx;
  text-align: center;
  font-size: 23rpx;
  color: #666666;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
