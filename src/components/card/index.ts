Component({
  externalClasses: ['i-card-class'],
  relations: {
    '../i-header/index': {
      type: 'child',
    },
  },
  properties: {
    outlined: {
      type: Boolean,
      value: false,
    },
    backgroundColor: {
      type: String,
      value: '#fff',
    },
  },
  methods: {},
});
