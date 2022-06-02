const path = require('path');
const simulate = require('miniprogram-simulate');

test('i-icon', () => {
  const id = simulate.load(path.join(__dirname, '../src/i-icon/index'));
  const comp = simulate.render(id);

  const parent = document.createElement('parent-wrapper'); // 创建父亲节点
  comp.attach(parent); // attach 到父亲节点上

  expect(comp.querySelector('.index').dom.innerHTML).toBe('index.properties'); // 测试渲染结果

  comp.detach();
});
