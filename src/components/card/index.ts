Component({
  relations: {
    './card-section/index': {
      type: 'child',
    },
    './card-actions/index': {
      type: 'child',
    },
  },
  properties: {
    bordered: {
      type: Boolean,
      value: false,
    },
  },
});
