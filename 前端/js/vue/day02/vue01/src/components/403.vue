<template>
  <div align="center">
    <b-card no-body class="overflow-hidden" style="max-width:70%">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body title="错误码:403" class="text-center" body-text-variant="warning">
            <b-card-text>
              您没有权限访问,以下可能帮助您操作
            </b-card-text>
            <b-button variant="primary" @click="this.$router.push('/index')">首页</b-button>
            <b-button variant="info" @click="this.$router.push(-1)">上一页</b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>

</script>
