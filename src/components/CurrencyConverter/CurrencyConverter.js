import React from 'react';
import styles from './CurrencyConverter.module.scss';
import { getRate } from '../../api';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uah: '',
      usd: '',
      buyRate: '',
      sellRate: ''
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  inputHandler({ target: { value, name } }) {
    if (value < 0) {
      return;
    }
    const { sellRate, buyRate } = this.state;
    if (name === 'uah') {
      this.setState({
        uah: value,
        usd: (value / sellRate).toFixed(2)
      });
    }

    if (name === 'usd') {
      this.setState({
        uah: (value * buyRate).toFixed(2),
        usd: value
      });
    }
  }

  componentDidMount() {
    getRate().then(data => {
      this.setState({
        buyRate: data[0].buy,
        sellRate: data[0].sale
      });
    });
  }

  render() {
    const { uah, usd } = this.state;

    return (
      <form className={styles['converter-form']}>
        <label>
          UAH
          <input
            type="number"
            placeholder="Sell UAH"
            name="uah"
            onChange={this.inputHandler}
            value={uah}
          />
        </label>
        <label>
          USD
          <input
            type="number"
            placeholder="Buy USD"
            name="usd"
            onChange={this.inputHandler}
            value={usd}
          />
        </label>
      </form>
    );
  }
}

export default CurrencyConverter;
