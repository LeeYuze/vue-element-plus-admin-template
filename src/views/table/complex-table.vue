<template>
  <div class="app-container">
    <el-card class="mb-10px" shadow="never">
      <el-form :model="form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="订单编号">
              <el-input v-model="form.orderNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态">
              <el-select class="w100%" v-model="form.orderType">
                <el-option
                  v-for="option in orderTypeOptions"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件人">
              <el-input v-model="form.receiver"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件时间">
              <el-date-picker
                class="dateTimePicker-w100"
                v-model="form.receiveTime"
                type="datetime"
                placeholder="Select date and time"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件时间">
              <el-date-picker
                class="dateTimePicker-w100"
                v-model="form.receiveTime"
                type="datetimerange"
                placeholder="Select date and time"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button>重置</el-button>
              <el-button type="primary" :icon="Search">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between items-center">
          <span>表格演示</span>
          <el-button class="button" type="primary" @click="dialogVisible = true"
            >新增</el-button
          >
        </div>
      </template>
      <TablePanel
        ref="tableRef"
        :url="fetchList"
        :response="response"
        :pageSize="pageSize"
        @changePage="handleChangePage"
      >
        <el-table-column label="ID" sortable="custom" align="center" width="80">
          <template #default="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Date" width="150px" align="center">
          <template #default="{ row }">
            <span>{{
              row.timestamp && parseTime(row.timestamp, '{y}-{m}-{d} {h}:{i}')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Title" min-width="150px">
          <template #default="{ row }">
            <span class="link-type">{{ row.title }}</span>
            <el-tag>{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Author" width="110px" align="center">
          <template #default="{ row }">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <table-operation
              :columns="tableRowOperationColumns"
            ></table-operation>
          </template>
        </el-table-column>
      </TablePanel>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      title="新增信息"
      width="50%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="complex-table">
import { Search } from '@element-plus/icons-vue';
import TablePanel from '@/components/TablePanel/index.vue';
import { fetchList } from '@/api/article/index';
import { parseTime } from '@/utils';
import * as TableOperationType from '@/components/TableOperation/types';
import { useDebounceFn } from '@vueuse/shared';
import { ElMessageBox } from 'element-plus';

type selectOption = {
  /**
   * 下拉框标签
   */
  label: string;
  /**
   * 下拉框值
   */
  value: string;
};

const response = ref<object>({
  data: 'data',
  list: 'items',
  resultCode: 'code',
  pageObj: false,
  totalRow: 'total'
});

const tableRowOperationColumns = ref<TableOperationType.TableOperationColumns>([
  {
    title: '编辑',
    type: TableOperationType.TableOperationColumnsTypeEnum.TEXT,
    event: useDebounceFn(() => {
      console.log('bianji');
    }, 200)
  },
  {
    title: '更多',
    type: TableOperationType.TableOperationColumnsTypeEnum.DROPDOWN,
    dropdownColumns: [
      {
        title: '123',
        event: useDebounceFn(() => {
          console.log('123');
        }, 200)
      }
    ]
  }
]);
const pageSize = ref<number>(3);
const tableRef = ref<InstanceType<typeof TablePanel>>();

const requestParams = {
  limit: pageSize.value
};

const orderTypeOptions = ref<selectOption[]>([
  {
    label: '全部',
    value: ''
  },
  {
    label: '已完成',
    value: 'done'
  }
]);

const form = reactive({
  orderNo: '',
  orderType: '',
  receiver: '',
  receiveTime: ''
});

onMounted(() => {
  tableRef.value && tableRef.value.search({ ...requestParams });
});

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

function handleChangePage(pageNum: number) {
  tableRef.value && tableRef.value.search({ ...requestParams, page: pageNum });
}
</script>

<style lang="scss" scoped></style>
