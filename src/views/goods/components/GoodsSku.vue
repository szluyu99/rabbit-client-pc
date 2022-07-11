<template>
  <div class="goods-sku">
    <dl v-for="spec in specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="value in spec.values" :key="value.name">
          <img
            v-if="value.picture"
            :src="value.picture"
            :alt="value.name"
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="updateSpecSelected(spec, value)"
          />
          <span
            v-else
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="updateSpecSelected(spec, value)"
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<script setup name="GoodsSku">
import useGoodsSku from '@/hooks/goods/useGoodsSku'

const props = defineProps({
  specs: {
    type: Array,
    default: () => []
  },
  skus: {
    type: Array,
    default: () => []
  },
  skuId: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['onSpecChange'])

const { updateSpecSelected } = useGoodsSku(props, emit)
</script>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
