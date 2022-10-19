<template>
  <ul class="table-operation">
    <template v-for="item in columns">
      <li
        v-if="item.type === Types.TableOperationColumnsTypeEnum.TEXT"
        class="table-operation-item"
        @click="item.event"
      >
        {{ item.title }}
      </li>
      <el-dropdown v-else class="table-operation-item">
        <div> {{ item.title }} </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="dropdownColumn in item.dropdownColumns"
              :disabled="dropdownColumn.disabled"
              :divided="dropdownColumn.divided"
              @click="dropdownColumn.event">
              {{ dropdownColumn.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </ul>
</template>

<script lang="ts" setup name="TableOperation">
import type { PropType } from 'vue';
import * as Types from './types';
const props = defineProps({
  columns: {
    type: Array as PropType<Types.TableOperationColumns>,
    required: true
  }
});
</script>

<style lang="scss" scoped>
$--text-color: rgb(22, 119, 255);
.table-operation {
  padding: 0;
  display: flex;
  align-items: center;
}
.table-operation-item {
  position: relative;
  padding: 0 10px;
  color: $--text-color;
  list-style-type: none;
  user-select: none;
  cursor: pointer;
  line-height: 37px;
  &:hover {
    color: rgba($color: $--text-color, $alpha: 0.7);
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 12px;
    background-color: #dbe3ef;
    transform: translateY(-50%);
  }
  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    &::after {
      display: none;
    }
  }
}
</style>
