import { assert } from 'chai';
import render from '../helpers/render';
import Input from '../components/Input';

const testPlaceholder = 'test placeholder';

const inputTest = new Input({
  name: 'input',
  type: 'text',
  placeholder: testPlaceholder,
});

render('app', inputTest);

describe('Создание инстанса блока', () => {
  it('Инпут добавлен в DOM-дерево', () => {
    const input: HTMLInputElement | null = window.document.querySelector('input');
    assert.notEqual(input, null);
  });

  it('Переданные инпуту атрибуты есть у инпута в DOM-дереве', () => {
    const input: HTMLInputElement | null = window.document.querySelector('input');
    assert.equal(input?.placeholder, testPlaceholder);
  });
});

describe('Изменение атрибутов в props влечет за собой изменения в DOM-дереве', () => {
  const newPlaceholder = 'new placeholder';

  before(() => {
    inputTest.setProps({
      placeholder: newPlaceholder,
    });
  });

  it('Атрибут placeholder у инпута в DOM-дереве равен новому переданному в props', () => {
    const input: HTMLInputElement | null = window.document.querySelector('input');
    assert.equal(input?.placeholder, newPlaceholder);
  });
});
