import React, { Component } from "react";
import styled from "styled-components";

class AttackTypeCard extends Component {
  state = {
    selectedAttackType: "swing",
    damage: 0,
    chanceOfTrigger: 0,
    oncePerTurn: 0,
    mill: 0,
    times: 0,
    id: 0,
    leave0: true,
  };

  componentDidMount() {
    this.setState({ id: this.props.id });
  }

  componentDidUpdate() {
    this.props.onData(this.state);
    //console.log(this.state)
  }

  handleSelectChange = (event) => {
    this.setState({ selectedAttackType: event.target.value });
  };

  handleChange = (event) => {
    let { name, value, checked } = event.target;

    if (!isNaN(value)) {
      value = parseInt(value);
    }

    if (checked === true && name == "leave0") {
      value = true;
    }

    if (checked === false && name == "leave0") {
      value = false;
    }

    this.setState({ [name]: value }, () => {
      //console.log(this.state)
    });
  };

  sendDataToParent = () => {
    this.props.onData(this.state.data);
  };

  renderAttackType() {
    const { selectedAttackType } = this.state;
    switch (selectedAttackType) {
      case "swing":
        return this.swingAttack();
      case "burn":
        return this.burnAttack();
      case "millXburn1forX":
        return this.millXburn1forX();
      case "cancelBurn":
        return this.onCancelBurn();
      case "cancelMushashi":
        return this.onCancelMushashi();
      case "towa":
        return this.towa();
      default:
        return this.swingAttack();
    }
  }

  swingAttack = () => {
    return (
      <>
        <DamageTitle>Swing amount</DamageTitle>

        <Input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          name="damage"
          defaultValue={0}
        ></Input>
      </>
    );
  };

  burnAttack = () => {
    return (
      <>
        <DamageTitle>Burn amount</DamageTitle>
        <Input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          name="damage"
          defaultValue={0}
        ></Input>
      </>
    );
  };

  millXburn1forX = () => {
    return (
      <>
        <DamageTitle>Amount of cards to mill</DamageTitle>
        <Input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          name="mill"
          defaultValue={0}
        ></Input>
        <DamageTitle>Damage per milled CX</DamageTitle>
        <Input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          name="damage"
          defaultValue={0}
        ></Input>
      </>
    );
  };

  onCancelBurn = () => {
    return (
      <>
        <DamageTitle>On cancel burn amount</DamageTitle>
        <Input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          name="damage"
          defaultValue={0}
        ></Input>
      </>
    );
  };

  onCancelMushashi = () => {
    return (
      <>
        <DamageTitle>
          On cancel, mill 1 burn x, x equals milled card's level
        </DamageTitle>
      </>
    );
  };

  towa = () => {
    return (
      <>
        <DamageTitle>Towa (Generally better to leave a 0 on top.)</DamageTitle>
        <label>
          <Input
            type="checkbox"
            onChange={this.handleChange}
            name="leave0"
            defaultChecked={this.state.leave0}
          ></Input>
          Check this box to leave the 0 on top of deck.
        </label>
      </>
    );
  };

  render() {
    const { selectedAttackType } = this.state;

    return (
      <>
        <AttackContainer>
          <Button>X</Button>
          <Number>{this.state.id + 1}.</Number>

          <Select value={selectedAttackType} onChange={this.handleSelectChange}>
            <option value="swing">Swing</option>
            <option value="burn">Burn</option>
            <option value="millXburn1forX">Mill x, burn y, for z times</option>
            <option value="towa">Towa</option>
            <option value="cancelBurn">On cancel burn</option>
            <option value="cancelMushashi">Musashi</option>
          </Select>
          <br />
          <br />
          {this.renderAttackType()}
        </AttackContainer>
      </>
    );
  }
}

export default AttackTypeCard;

const AttackContainer = styled.div`
  padding: 20px;
  border: 3px solid rgb(220, 220, 220);
  border-radius: 5px;
  margin: 5px 0 5px 0;
  position: relative;
  text-align: left;
`;

const Number = styled.div`
  position: absolute;
  top: 12px;
  left: 20px;
  font-size: 18px;
`;

const AttackTitle = styled.div`
  font-size: 20px;
  padding-bottom: 8px;
`;

const DamageTitle = styled.div`
  font-size: 15px;
`;

const Input = styled.input``;

const Select = styled.select`
  margin-top: 20px;
`;

const Button = styled.button`
  position: absolute;
  background-color: rgb(220, 220, 220);
  border: 3px solid rgb(220, 220, 220);
  padding: 2px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 10px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 5px;
  right: 0;
  top: 0;

  &:hover {
    border: 3px solid rgb(240, 240, 240);
  }
`;
