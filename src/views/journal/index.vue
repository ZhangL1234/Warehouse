<template>
  <div class="con_rig_bottom app-container app-panel">
    <div class="item">
      <div v-for="(item,index) in list" :key="item.id" class="item-list" @click="btnClick(index)"
        :class="{active:currntIndex==index}">{{item}}</div>
      <!-- <div>所有</div>
            <div>今天</div>
            <div>昨天</div>
            <div>本周</div>
            <div>上周</div>
      <div>本月</div>-->
    </div>
    <div style="margin-left:11%;padding-bottom:30px;width:80%;">
      <div class="out">
        <div class="out-item1">
          <p>今天</p>
          <p>11月19号</p>
        </div>
        <div class="out-item2">
          <p>10：12 登录系统</p>
          <p>10：12 登录系统</p>
          <hr style="background-color:gray;height:1px;border:none;" />
        </div>
      </div>
      <div class="out">
        <div class="out-item1">
          <p>昨天</p>
          <p>11月19号</p>
        </div>
        <div class="out-item2">
          <p>10：12 登录系统</p>
          <p>10：12 登录系统</p>
          <hr style="background-color:gray;height:1px;border:none;" />
        </div>
      </div>
      <div class="out">
        <div class="out-item1">
          <p>本周</p>
          <p>11月19号</p>
        </div>
        <div class="out-item2">
          <p>10：12 登录系统</p>
          <p>10：12 登录系统</p>
          <hr style="background-color:gray;height:1px;border:none;" />
        </div>
      </div>
      <div class="out">
        <div class="out-item1">
          <p>上周</p>
          <p>11月19号</p>
        </div>
        <div class="out-item2">
          <p>10：12 登录系统</p>
          <p>10：12 登录系统</p>
          <hr style="background-color:gray;height:1px;border:none;" />
        </div>
        <br />
        <br />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: ["所有", "今天", "昨天", "本周", "上周", "本月"],
        currntIndex: 0
      };
    },
    methods: {
      btnClick(index) {
        // console.log(index)
        this.currntIndex = index;
        switch (index) {
          case 0:
            console.log("所有");
            break;
          case 1:
            console.log("今天");
            break;
          case 2:
            console.log("昨天");
            break;
        }
      }
    }
  };
</script>
<style>
  .con_rig_bottom {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    height: 550px;
  }

  .item {
    display: flex;
    margin-left: 10%;
    /* margin-top: 10%; */
    width: 30%;
  }

  .item-list {
    margin-top: 10%;
    margin-bottom: 10%;
    flex: 1;
    cursor: pointer;
  }

  .active {
    color: red;
  }

  .out-item1 p {
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
  }

  .out {
    margin-bottom: 10px;
    display: flex;
    height: 80px;
  }

  .out-item1 {
    flex: 1;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(255, 92, 92, 1);
    line-height: 120%;
    text-align: left;
    font-size: 15px;
  }

  .out-item2 {
    flex: 8;
    margin-left: 2%;
  }
</style>