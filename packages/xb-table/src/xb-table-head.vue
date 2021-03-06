<template>
  <table cellspacing="0" cellpadding="0" border="0" :style="styles">
    <colgroup>
      <col v-for="(column, index) in columns" :width="setCellWidth(column)">
      <col v-if="$parent.showVerticalScrollBar" :width="$parent.scrollBarWidth">
    </colgroup>
    <thead>
      <tr v-for="(cols, rowIndex) in headRows">
        <th
          v-for="(column, index) in cols"
          :colspan="column.colSpan"
          :rowspan="column.rowSpan"
          :class="alignCls(column)"
        >
          <div :class="cellClasses(column)">
            <template v-if="column.type === 'expand'">
              <span v-if="!column.renderHeader">{{ column.title || '' }}</span>
              <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
            </template>
            <template v-else-if="column.type === 'selection'">
              <Checkbox :value="isSelectAll" :disabled="!data.length" @on-change="selectAll"></Checkbox>
            </template>
            <template v-else>
              <span
                v-if="!column.renderHeader"
                :class="{[prefixCls + '-cell-sort']: column.sortable}"
                @click="handleSortByHead(getColumn(rowIndex, index)._index)"
              >{{ column.title || '#' }}</span>
              <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
              <span :class="[prefixCls + '-sort']" v-if="column.sortable">
                <i
                  class="xbui-icon xbui-icon-arrow-up-b"
                  :class="{on: getColumn(rowIndex, index)._sortType === 'asc'}"
                  @click="handleSort(getColumn(rowIndex, index)._index, 'asc')"
                ></i>
                <i
                  class="xbui-icon xbui-icon-arrow-down-b"
                  :class="{on: getColumn(rowIndex, index)._sortType === 'desc'}"
                  @click="handleSort(getColumn(rowIndex, index)._index, 'desc')"
                ></i>
              </span>
              <Poptip
                v-if="isPopperShow(column)"
                v-model="getColumn(rowIndex, index)._filterVisible"
                placement="bottom"
                popper-class="xbui-table-popper"
                transfer
                @on-popper-hide="handleFilterHide(getColumn(rowIndex, index)._index)"
              >
                <span :class="[prefixCls + '-filter']">
                  <i
                    class="xbui-icon xbui-icon-funnel"
                    :class="{on: getColumn(rowIndex, index)._isFiltered}"
                  ></i>
                </span>

                <div
                  slot="content"
                  :class="[prefixCls + '-filter-list']"
                  v-if="getColumn(rowIndex, index)._filterMultiple"
                >
                  <div :class="[prefixCls + '-filter-list-item']">
                    <checkbox-group v-model="getColumn(rowIndex, index)._filterChecked">
                      <checkbox
                        v-for="(item, index) in column.filters"
                        :key="index"
                        :label="item.value"
                      >{{ item.label }}</checkbox>
                    </checkbox-group>
                  </div>
                  <div :class="[prefixCls + '-filter-footer']">
                    <i-button
                      type="text"
                      size="small"
                      :disabled="!getColumn(rowIndex, index)._filterChecked.length"
                      @click.native="handleFilter(getColumn(rowIndex, index)._index)"
                    >{{ t('i.table.confirmFilter') }}</i-button>
                    <i-button
                      type="text"
                      size="small"
                      @click.native="handleReset(getColumn(rowIndex, index)._index)"
                    >{{ t('i.table.resetFilter') }}</i-button>
                  </div>
                </div>
                <div slot="content" :class="[prefixCls + '-filter-list']" v-else>
                  <ul :class="[prefixCls + '-filter-list-single']">
                    <li
                      :class="itemAllClasses(getColumn(rowIndex, index))"
                      @click="handleReset(getColumn(rowIndex, index)._index)"
                    >{{ t('i.table.clearFilter') }}</li>
                    <li
                      :class="itemClasses(getColumn(rowIndex, index), item)"
                      v-for="item in column.filters"
                      @click="handleSelect(getColumn(rowIndex, index)._index, item.value)"
                    >{{ item.label }}</li>
                  </ul>
                </div>
              </Poptip>
            </template>
          </div>
        </th>

        <th
          v-if="$parent.showVerticalScrollBar && rowIndex===0"
          :class="scrollBarCellClass()"
          :rowspan="headRows.length"
        ></th>
      </tr>
    </thead>
  </table>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import CheckboxGroup from "../../xb-checkbox-group";
import Checkbox from "../../xb-checkbox";
import Poptip from "../../xb-poptip";
import Button from "../../xb-button";
import renderHeader from "./header";
import Mixin from "./mixin";
import Locale from "src/mixins/locale";

@Component({ name: "XbTableHead", components: { CheckboxGroup, Checkbox, Poptip, Button, renderHeader } })
export default class XbTableHead extends Mixins(Mixin, Locale) {
  @Prop({ type: String })
  prefixCls!: string;
  @Prop({ type: Object })
  styleObject!: CSSStyleDeclaration;
  @Prop({ type: Array })
  columns!: any[];
  @Prop({ type: Object })
  objData!: object;
  @Prop({ type: Array })
  data!: any[]; // rebuildData
  @Prop({ type: Object })
  columnsWidth!: object;
  @Prop({
    type: [Boolean, String],
    default: false,
  })
  fixed!: boolean | string;
  @Prop({ type: Array })
  columnRows!: any[];
  @Prop({ type: Array })
  fixedColumnRows!: any[];

  get styles() {
    if (this.styleObject.width) {
      const style = Object.assign({}, this.styleObject);
      const width = parseInt(this.styleObject.width, 10);
      style.width = `${width}px`;
      return style;
    }
  }
  get isSelectAll() {
    let isSelectAll = true;
    if (!this.data.length) {
      isSelectAll = false;
    }
    if (!this.data.find((item) => !item._disabled)) {
      isSelectAll = false;
    } // #1751
    for (const data of this.data) {
      if (!this.objData[data._index]._isChecked && !this.objData[data._index]._isDisabled) {
        isSelectAll = false;
        break;
      }
    }

    return isSelectAll;
  }
  get headRows() {
    const isGroup = this.columnRows.length > 1;
    if (isGroup) {
      return this.fixed ? this.fixedColumnRows : this.columnRows;
    } else {
      return [this.columns];
    }
  }

  cellClasses(column) {
    return [
      `${this.prefixCls}-cell`,
      {
        [`${this.prefixCls}-hidden`]:
          !this.fixed && column.fixed && (column.fixed === "left" || column.fixed === "right"),
      },
    ];
  }
  scrollBarCellClass() {
    let hasRightFixed = false;
    for (const headRows of this.headRows) {
      for (const headRow of headRows) {
        if (headRow.fixed === "right") {
          hasRightFixed = true;
          break;
        }
        if (hasRightFixed) {
          break;
        }
      }
    }
    return [
      {
        [`${this.prefixCls}-hidden`]: hasRightFixed,
      },
    ];
  }
  itemClasses(column, item) {
    return [
      `${this.prefixCls}-filter-select-item`,
      {
        [`${this.prefixCls}-filter-select-item-selected`]: column._filterChecked[0] === item.value,
      },
    ];
  }
  itemAllClasses(column) {
    return [
      `${this.prefixCls}-filter-select-item`,
      {
        [`${this.prefixCls}-filter-select-item-selected`]: !column._filterChecked.length,
      },
    ];
  }
  selectAll() {
    const status = !this.isSelectAll;
    this.$parent.selectAll(status);
  }
  handleSort(index, type) {
    const column = this.columns[index];
    const _index = column._index;

    if (column._sortType === type) {
      type = "normal";
    }
    this.$parent.handleSort(_index, type);
  }
  handleSortByHead(index) {
    const column = this.columns[index];
    if (column.sortable) {
      const type = column._sortType;
      if (type === "normal") {
        this.handleSort(index, "asc");
      } else if (type === "asc") {
        this.handleSort(index, "desc");
      } else {
        this.handleSort(index, "normal");
      }
    }
  }
  handleFilter(index) {
    this.$parent.handleFilter(index);
  }
  handleSelect(index, value) {
    this.$parent.handleFilterSelect(index, value);
  }
  handleReset(index) {
    this.$parent.handleFilterReset(index);
  }
  handleFilterHide(index) {
    this.$parent.handleFilterHide(index);
  }
  // 因为表头嵌套不是深拷贝，所以没有 _ 开头的方法，在 isGroup 下用此列
  getColumn(rowIndex, index) {
    const isGroup = this.columnRows.length > 1;

    if (isGroup) {
      const id = this.headRows[rowIndex][index].__id;
      return this.columns.filter((item) => item.__id === id)[0];
    } else {
      return this.headRows[rowIndex][index];
    }
  }
}
</script>
