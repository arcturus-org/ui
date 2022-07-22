import semicircle from './semicircle';
import Options from './options';

Component({
  properties: {
    options: Object,
    width: {
      type: Number,
      value: 200,
    },
    height: {
      type: Number,
      value: 200,
    },
  },

  lifetimes: {
    ready() {
      this.createSelectorQuery()
        .in(this)
        .select('#progress')
        .fields({ node: true, size: true })
        .exec((res) => {
          const p = new semicircle(res[0]);

          p.init(this.data.options as Options);
        });
    },
  },
});
