import { DefineComponent } from 'vue';

export enum TableOperationColumnsTypeEnum {
  TEXT = 'text',
  DROPDOWN = 'dropdown'
}

type dropdownColumns = {
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否显示分隔符
   */
  divided?: boolean;
  /**
   * 自定义图标
   */
  icon?: string | DefineComponent<any, any, any>;
} & Omit<TableOperationColumnsType, 'type' | 'dropdownColumns'>;

export type TableOperationColumnsType = {
  /**
   * 操作名称
   */
  title: string;
  /**
   * 操作类型
   */
  type: TableOperationColumnsTypeEnum;
  /**
   * 当鼠标点击时事件
   */
  event?: Function;
  /**
   * 当类型为DROPDOWN时，DROPDOWN该显示的内容
   */
  dropdownColumns?: dropdownColumns[];
};

export type TableOperationColumns = TableOperationColumnsType[];
