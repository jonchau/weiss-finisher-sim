import React from "react";
import styled from "styled-components";
import AttackTypeCard from "../components/attackTypeCard.jsx";
import Disclaimer from "../components/disclaimer.jsx";

class App extends React.Component {
  state = {
    deck: [],
    waitingRoom: [],
    resolutionZone: [],
    cx: 7,
    v: 18,
    oppoZeros: 5,
    oppoOnes: 7,
    oppoTwos: 1,
    oppoThrees: 5,
    zeros: 8,
    ones: 7,
    twos: 2,
    threes: 6,
    yourCx: 7,
    yourTriggers: 7,
    clock: [],
    attackTypeArray: [],
    damageArray: [],
    yourDeck: [],
    yourWaitingRoom: [],
    chanceOf1Dmg: 0,
    chanceOf2Dmg: 0,
    chanceOf3Dmg: 0,
    chanceOf4Dmg: 0,
    chanceOf5Dmg: 0,
    chanceOf6Dmg: 0,
    chanceOf7Dmg: 0,
    chanceOf8Dmg: 0,
    chanceOf9plusDmg: 0,
  };

  deck = [];
  waitingRoom = [];
  resolutionZone = [];
  clock = [];
  yourDeck = [];
  yourWaitingRoom = [];
  chanceOf1Dmg = 0;
  chanceOf2Dmg = 0;
  chanceOf3Dmg = 0;
  chanceOf4Dmg = 0;
  chanceOf5Dmg = 0;
  chanceOf6Dmg = 0;
  chanceOf7Dmg = 0;
  chanceOf8Dmg = 0;
  chanceOf9plusDmg = 0;
  timesSimulated = 0;
  timesToSimulate = 500;

  getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  resetDmg = () => {
    this.chanceOf1Dmg = 0;
    this.chanceOf2Dmg = 0;
    this.chanceOf3Dmg = 0;
    this.chanceOf4Dmg = 0;
    this.chanceOf5Dmg = 0;
    this.chanceOf6Dmg = 0;
    this.chanceOf7Dmg = 0;
    this.chanceOf8Dmg = 0;
    this.chanceOf9plusDmg = 0;
    this.timesSimulated = 0;

    this.setState({
      chanceOf1Dmg: this.chanceOf1Dmg,
      chanceOf2Dmg: this.chanceOf2Dmg,
      chanceOf3Dmg: this.chanceOf3Dmg,
      chanceOf4Dmg: this.chanceOf4Dmg,
      chanceOf5Dmg: this.chanceOf5Dmg,
      chanceOf6Dmg: this.chanceOf6Dmg,
      chanceOf7Dmg: this.chanceOf7Dmg,
      chanceOf8Dmg: this.chanceOf8Dmg,
      chanceOf9plusDmg: this.chanceOf9plusDmg,
    });
  };

  resetGame = () => {
    this.deck = [];
    this.waitingRoom = [];
    this.resolutionZone = [];
    this.clock = [];
    this.yourDeck = [];

    //make opponent's deck and shuffle
    for (let i = 0; i < this.state.cx; i++) {
      this.deck.push("cx");
    }

    for (let i = 0; i < this.state.oppoZeros; i++) {
      this.deck.push(0);
    }

    for (let i = 0; i < this.state.oppoOnes; i++) {
      this.deck.push(1);
    }
    for (let i = 0; i < this.state.oppoTwos; i++) {
      this.deck.push(2);
    }
    for (let i = 0; i < this.state.oppoThrees; i++) {
      this.deck.push(3);
    }

    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }

    //make your deck and shuffle
    for (let i = 0; i < this.state.yourCx; i++) {
      this.yourDeck.push("cx");
    }

    for (let i = 0; i < this.state.zeros; i++) {
      this.yourDeck.push(0);
    }

    for (let i = 0; i < this.state.ones; i++) {
      this.yourDeck.push(1);
    }

    for (let i = 0; i < this.state.twos; i++) {
      this.yourDeck.push(2);
    }

    for (let i = 0; i < this.state.threes; i++) {
      this.yourDeck.push(3);
    }

    for (let i = this.yourDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.yourDeck[i], this.yourDeck[j]] = [
        this.yourDeck[j],
        this.yourDeck[i],
      ];
    }
  };

  handleChange = (event) => {
    let { name, value } = event.target;

    if (!isNaN(value)) {
      value = parseInt(value);
    }

    this.setState({ [name]: value }, () => {
      //console.log(this.state)
    });
  };

  handleDataFromChild = (data) => {
    const tempDamageArray = this.state.damageArray;
    const updatedItem = {
      ...tempDamageArray[data.id],
      selectedAttackType: data.selectedAttackType,
      chanceOfTrigger: data.chanceOfTrigger,
      damage: data.damage,
      mill: data.mill,
      times: data.times,
      leave0: data.leave0,
    };

    tempDamageArray[data.id] = updatedItem;

    this.setState({ damageArray: tempDamageArray }, () => {
      console.log(this.state.damageArray);
    });
  };

  addAttack = () => {
    //attack type array is the array that holds the card components seen on screen
    //damage array is the array that holds the damage and details of the attack

    const index = this.state.attackTypeArray.length;
    const newComponent = (
      <AttackTypeCard
        key={index}
        id={index}
        onData={this.handleDataFromChild}
      ></AttackTypeCard>
    );

    this.setState(
      {
        attackTypeArray: [...this.state.attackTypeArray, newComponent],
        damageArray: [
          ...this.state.damageArray,
          {
            selectedAttackType: "swing",
            damage: 0,
            chanceOfTrigger: 0,
            mill: 0,
            times: 0,
          },
        ],
      },
      () => {
        //console.log(this.state.attackTypeArray)
        //console.log(this.state.damageArray)
      }
    );
  };

  dmg = () => {
    for (let j = 0; j < this.timesToSimulate; j++) {
      this.resetGame();

      for (let z = 0; z < this.state.damageArray.length; z++) {
        //skip on cancel effs in array if they're on their own
        if (
          this.state.damageArray[z].selectedAttackType == "cancelBurn" ||
          this.state.damageArray[z].selectedAttackType == "cancelMushashi"
        ) {
          continue;
        }

        let damageAmount = this.state.damageArray[z].damage;

        //check for different types of attacks
        if (this.state.damageArray[z].selectedAttackType == "swing") {
          //add chance of trigger
          let totalCardsInYourDeck =
            this.state.zeros +
            this.state.ones +
            this.state.twos +
            this.state.threes +
            this.state.yourCx;
          let yourTrigs = this.state.yourTriggers;

          if (
            this.getRandomInt(100) <=
            (yourTrigs / totalCardsInYourDeck) * 100 - 1
          ) {
            damageAmount++;
          }
          this.swing(damageAmount, z);
        }

        if (this.state.damageArray[z].selectedAttackType == "burn") {
          this.swing(damageAmount, z);
        }

        if (this.state.damageArray[z].selectedAttackType == "millXburn1forX") {
          let millAmount = this.state.damageArray[z].mill;

          this.millXburn1forX(millAmount, damageAmount);
        }

        if (this.state.damageArray[z].selectedAttackType == "towa") {
          this.towa(this.state.damageArray[z].leave0);
        }

        //set the damage from reso zone onto clock and clear reso zone
        this.clock = [...this.clock, ...this.resolutionZone];
        this.resolutionZone = [];
      }

      if (this.clock.length == 1) {
        this.chanceOf1Dmg++;
      }
      if (this.clock.length == 2) {
        this.chanceOf2Dmg++;
      }
      if (this.clock.length == 3) {
        this.chanceOf3Dmg++;
      }
      if (this.clock.length == 4) {
        this.chanceOf4Dmg++;
      }
      if (this.clock.length == 5) {
        this.chanceOf5Dmg++;
      }
      if (this.clock.length == 6) {
        this.chanceOf6Dmg++;
      }
      if (this.clock.length == 7) {
        this.chanceOf7Dmg++;
      }
      if (this.clock.length == 8) {
        this.chanceOf8Dmg++;
      }
      if (this.clock.length >= 9) {
        this.chanceOf9plusDmg++;
      }
    }

    this.timesSimulated += this.timesToSimulate;
    this.setState({
      chanceOf1Dmg: this.chanceOf1Dmg,
      chanceOf2Dmg: this.chanceOf2Dmg,
      chanceOf3Dmg: this.chanceOf3Dmg,
      chanceOf4Dmg: this.chanceOf4Dmg,
      chanceOf5Dmg: this.chanceOf5Dmg,
      chanceOf6Dmg: this.chanceOf6Dmg,
      chanceOf7Dmg: this.chanceOf7Dmg,
      chanceOf8Dmg: this.chanceOf8Dmg,
      chanceOf9plusDmg: this.chanceOf9plusDmg,
    });
  };

  //different types of dmg outputs

  //------------------------normal attack---------------------------
  swing = (damageAmount, z) => {
    for (let i = 0; i < damageAmount; i++) {
      //check for cards in deck if not then refresh
      if (this.deck.length <= 0) {
        this.deck = [...this.waitingRoom];
        this.waitingRoom = [];

        for (let i = this.deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }

        this.clock.unshift(this.deck[0]);
        this.deck.splice(0, 1);
      }

      if (
        this.deck[0] == 0 ||
        this.deck[0] == 1 ||
        this.deck[0] == 2 ||
        this.deck[0] == 3
      ) {
        this.resolutionZone.unshift(this.deck[0]);
        this.deck.splice(0, 1);
      } else {
        //cancel
        this.resolutionZone.unshift(this.deck[0]);
        this.deck.splice(0, 1);
        this.waitingRoom = [...this.resolutionZone, ...this.waitingRoom];
        this.resolutionZone = [];

        //check for cancel effs
        if (
          this.state.damageArray[z + 1] &&
          this.state.damageArray[z + 1].selectedAttackType == "cancelBurn"
        ) {
          let damageAmount = this.state.damageArray[z + 1].damage;
          this.onCancelBurn(damageAmount);
        }

        if (
          this.state.damageArray[z + 1] &&
          this.state.damageArray[z + 1].selectedAttackType == "cancelMushashi"
        ) {
          let damageAmount = this.state.damageArray[z + 1].damage;
          this.onCancelMushashi(damageAmount);
        }

        break;
      }
    }
  };
  //--------------------------mushashi------------------------------
  onCancelMushashi = (damageAmount, z) => {
    if (this.yourDeck.length >= 1) {
      let burnAmount = this.yourDeck.splice(0, 1)[0];
      if (burnAmount == "cx") {
        burnAmount = 0;
      }
      burnAmount++;
      //console.log(burnAmount);
      for (let i = 0; i < burnAmount; i++) {
        //check for cards in deck if not then refresh
        if (this.deck.length <= 0) {
          this.deck = [...this.waitingRoom];
          this.waitingRoom = [];

          for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
          }
          this.clock.unshift(this.deck[0]);
          this.deck.splice(0, 1);
        }

        if (
          this.deck[0] == 0 ||
          this.deck[0] == 1 ||
          this.deck[0] == 2 ||
          this.deck[0] == 3
        ) {
          this.resolutionZone.unshift(this.deck[0]);
          this.deck.splice(0, 1);
        } else {
          //cancel
          this.resolutionZone.unshift(this.deck[0]);
          this.deck.splice(0, 1);
          this.waitingRoom = [...this.resolutionZone, ...this.waitingRoom];
          this.resolutionZone = [];
          break;
        }
      }
    } else {
      console.log("refresh");
    }
  };

  //---------------------------shot-------------------------------
  onCancelBurn = (damageAmount, z) => {
    for (let i = 0; i < damageAmount; i++) {
      //check for cards in deck if not then refresh
      if (this.deck.length <= 0) {
        this.deck = [...this.waitingRoom];
        this.waitingRoom = [];

        for (let i = this.deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        this.clock.unshift(this.deck[0]);
        this.deck.splice(0, 1);
      }

      if (
        this.deck[0] == 0 ||
        this.deck[0] == 1 ||
        this.deck[0] == 2 ||
        this.deck[0] == 3
      ) {
        this.resolutionZone.unshift(this.deck[0]);
        this.deck.splice(0, 1);
      } else {
        //cancel
        this.resolutionZone.unshift(this.deck[0]);
        this.deck.splice(0, 1);
        this.waitingRoom = [...this.resolutionZone, ...this.waitingRoom];
        this.resolutionZone = [];
        break;
      }
    }
  };

  //---------------------------marine------------------------------
  burn = (damageAmount) => {
    for (let i = 0; i < damageAmount; i++) {
      //check for cards in deck if not then refresh
      if (this.deck.length <= 0) {
        this.deck = [...this.waitingRoom];
        this.waitingRoom = [];

        for (let i = this.deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }

        this.clock.unshift(this.deck[0]);
        this.deck.splice(0, 1);
      }

      if (
        this.deck[0] == 0 ||
        this.deck[0] == 1 ||
        this.deck[0] == 2 ||
        this.deck[0] == 3
      ) {
        this.resolutionZone.unshift(this.deck[0]);
        this.deck.splice(0, 1);
      } else {
        //cancel
        this.resolutionZone.unshift(this.deck[0]);
        this.deck.splice(0, 1);
        this.waitingRoom = [...this.resolutionZone, ...this.waitingRoom];
        this.resolutionZone = [];
        break;
      }
    }
  };
  //---------------------------shinano------------------------------
  millXburn1forX = (millAmount, damageAmount) => {
    let timesToBurn = 0;
    let amountOfCx = 0;

    if (millAmount <= this.yourDeck.length) {
      amountOfCx = this.yourDeck
        .slice(0, millAmount)
        .filter((card) => card == "cx").length;
      timesToBurn = amountOfCx;
      this.yourDeck.splice(0, millAmount);
    } else {
      //keep track of 3
      let leftoverCards = this.yourDeck.length;

      //ex 3 cards left over, mill 3
      amountOfCx = this.yourDeck
        .slice(0, this.yourDeck.length)
        .filter((card) => card == "cx").length;

      //save amount of cx checked in mill 3
      timesToBurn = amountOfCx;

      this.yourDeck = [];

      //refresh deck
      for (let i = 0; i < this.state.yourCx; i++) {
        this.yourDeck.push("cx");
      }

      for (let i = 0; i < this.state.zeros; i++) {
        this.yourDeck.push(0);
      }

      for (let i = 0; i < this.state.ones; i++) {
        this.yourDeck.push(1);
      }

      for (let i = 0; i < this.state.twos; i++) {
        this.yourDeck.push(2);
      }

      for (let i = 0; i < this.state.threes; i++) {
        this.yourDeck.push(3);
      }

      for (let i = this.yourDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.yourDeck[i], this.yourDeck[j]] = [
          this.yourDeck[j],
          this.yourDeck[i],
        ];
      }
      //get rid of one card in deck to simulate it going to clock
      this.yourDeck.splice(0, 1);

      //continue milling
      amountOfCx = this.yourDeck
        .slice(0, millAmount - leftoverCards)
        .filter((card) => card == "cx").length;

      //add the new amount together
      timesToBurn = timesToBurn + amountOfCx;
      this.yourDeck.splice(0, millAmount - leftoverCards);
    }

    for (let t = 0; t < timesToBurn; t++) {
      for (let i = 0; i < damageAmount; i++) {
        //check for cards in deck if not then refresh
        if (this.deck.length <= 0) {
          this.deck = [...this.yourwaitingRoom];
          this.waitingRoom = [];

          for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
          }

          this.clock.unshift(this.deck[0]);
          this.deck.splice(0, 1);
        }

        if (
          this.deck[0] == 0 ||
          this.deck[0] == 1 ||
          this.deck[0] == 2 ||
          this.deck[0] == 3
        ) {
          this.resolutionZone.unshift(this.deck[0]);
          this.deck.splice(0, 1);
        } else {
          //cancel
          this.resolutionZone.unshift(this.deck[0]);
          this.deck.splice(0, 1);
          this.waitingRoom = [...this.resolutionZone, ...this.waitingRoom];
          this.resolutionZone = [];
          break;
        }
      }
      //set the damage from reso zone onto clock and clear reso zone
      this.clock = [...this.clock, ...this.resolutionZone];
      this.resolutionZone = [];
    }
  };

  //-----------------------------towa------------------------------
  towa = (leave0) => {
    //check if opponent has a deck
    if (this.deck.length >= 1) {
      //check the top card of opponent's deck and place it top or bottom
      const topCard = this.deck
        .slice(0, 1)
        .filter((card) => card == "cx" || card == 0)[0];

      //console.log(this.deck)
      if (leave0 === true && topCard === "cx") {
        this.deck.push(this.deck.shift());
      }

      if (leave0 === false && (topCard === "cx" || topCard === 0)) {
        this.deck.push(this.deck.shift());
      }

      if (this.deck.length >= 3) {
        //mill 3 from bottom
        let burnAmount = this.deck
          .slice(-3)
          .filter((card) => card == "cx" || card == 0).length;
        let milledCards = this.deck.splice(-3);

        this.waitingRoom = [...milledCards, ...this.waitingRoom];

        this.burn(burnAmount);
      } else {
        console.log("refresh");
      }
    }
  };

  render() {
    const cards = this.deck;
    const waitingRoom = this.waitingRoom;
    const clock = this.clock;
    const yourDeck = this.yourDeck;
    const yourWaitingRoom = this.yourWaitingRoom;

    //oppo layout
    const deckCards = cards.map((card, index) => {
      return <DeckCards key={index}>{card}</DeckCards>;
    });
    const waitingRoomCards = waitingRoom.map((card, index) => {
      return <DeckCards key={index}>{card}</DeckCards>;
    });
    const clockCards = clock.map((card, index) => {
      return <DeckCards key={index}>{card}</DeckCards>;
    });

    //your layout
    const yourDeckCards = yourDeck.map((card, index) => {
      return <DeckCards key={index}>{card}</DeckCards>;
    });
    const yourWaitingRoomCards = yourWaitingRoom.map((card, index) => {
      return <DeckCards key={index}>{card}</DeckCards>;
    });

    //display new attacks
    const showAttackTypeArray = this.state.attackTypeArray.map(
      (component, index) => <div key={index}>{component}</div>
    );

    return (
      <>
        <BigContainer>
          <Disclaimer></Disclaimer>

          <Container>
            <PercentageTable>
              <Table>
                <tr>
                  <Td>Chance of dealing at least 1 damage</Td>
                  <Td>
                    {(
                      ((this.state.chanceOf1Dmg +
                        this.state.chanceOf2Dmg +
                        this.state.chanceOf3Dmg +
                        this.state.chanceOf4Dmg +
                        this.state.chanceOf5Dmg +
                        this.state.chanceOf6Dmg +
                        this.state.chanceOf7Dmg +
                        this.state.chanceOf8Dmg +
                        this.state.chanceOf9plusDmg) /
                        this.timesSimulated) *
                      100
                    ).toFixed(2)}
                  </Td>
                </tr>
                <tr>
                  <Td>Chance of dealing at least 2 damage</Td>
                  <Td>
                    {(
                      ((this.state.chanceOf2Dmg +
                        this.state.chanceOf3Dmg +
                        this.state.chanceOf4Dmg +
                        this.state.chanceOf5Dmg +
                        this.state.chanceOf6Dmg +
                        this.state.chanceOf7Dmg +
                        this.state.chanceOf8Dmg +
                        this.state.chanceOf9plusDmg) /
                        this.timesSimulated) *
                      100
                    ).toFixed(2)}
                  </Td>
                </tr>
                <tr>
                  <Td>Chance of dealing at least 3 damage</Td>
                  <Td>
                    {(
                      ((this.state.chanceOf3Dmg +
                        this.state.chanceOf4Dmg +
                        this.state.chanceOf5Dmg +
                        this.state.chanceOf6Dmg +
                        this.state.chanceOf7Dmg +
                        this.state.chanceOf8Dmg +
                        this.state.chanceOf9plusDmg) /
                        this.timesSimulated) *
                      100
                    ).toFixed(2)}
                  </Td>
                </tr>
                <tr>
                  <Td>Chance of dealing at least 4 damage</Td>
                  <Td>
                    {(
                      ((this.state.chanceOf4Dmg +
                        this.state.chanceOf5Dmg +
                        this.state.chanceOf6Dmg +
                        this.state.chanceOf7Dmg +
                        this.state.chanceOf8Dmg +
                        this.state.chanceOf9plusDmg) /
                        this.timesSimulated) *
                      100
                    ).toFixed(2)}
                  </Td>
                </tr>
                <tr>
                  <Td>Chance of dealing at least 5 damage</Td>
                  <Td>
                    {(
                      ((this.state.chanceOf5Dmg +
                        this.state.chanceOf6Dmg +
                        this.state.chanceOf7Dmg +
                        this.state.chanceOf8Dmg +
                        this.state.chanceOf9plusDmg) /
                        this.timesSimulated) *
                      100
                    ).toFixed(2)}
                  </Td>
                </tr>
                <tr>
                  <Td>Chance of dealing at least 6 damage</Td>
                  <Td>
                    {(
                      ((this.state.chanceOf6Dmg +
                        this.state.chanceOf7Dmg +
                        this.state.chanceOf8Dmg +
                        this.state.chanceOf9plusDmg) /
                        this.timesSimulated) *
                      100
                    ).toFixed(2)}
                  </Td>
                </tr>
                <tr>
                  <Td>Chance of dealing at least 7 damage</Td>
                  <Td>
                    {(
                      ((this.state.chanceOf7Dmg +
                        this.state.chanceOf8Dmg +
                        this.state.chanceOf9plusDmg) /
                        this.timesSimulated) *
                      100
                    ).toFixed(2)}
                  </Td>
                </tr>
                <tr>
                  <Td>Chance of dealing at least 8 damage</Td>
                  <Td>
                    {(
                      ((this.state.chanceOf8Dmg + this.state.chanceOf9plusDmg) /
                        this.timesSimulated) *
                      100
                    ).toFixed(2)}
                  </Td>
                </tr>
                <tr>
                  <Td>Chance of dealing 9+ damage</Td>
                  <Td>
                    {(
                      (this.state.chanceOf9plusDmg / this.timesSimulated) *
                      100
                    ).toFixed(2)}
                  </Td>
                </tr>
              </Table>
              <Buttons
                onClick={this.dmg}
                padding="10px"
                width="178px"
                margin="10px 5px 0 0"
              >
                Take damage
              </Buttons>
              <Buttons
                onClick={this.resetDmg}
                padding="10px"
                width="178px"
                margin="10px 5px 0 0"
              >
                Reset table
              </Buttons>
            </PercentageTable>

            <Column1>
              <DeckTitle>Opponent's deck state</DeckTitle>

              <div>
                {/* amount of cards in oppo deck */}
                <DamageTitle>Level 0s left in deck</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="oppoZeros"
                  defaultValue={this.state.oppoZeros}
                ></Input>

                <DamageTitle>Level 1s</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="oppoOnes"
                  defaultValue={this.state.oppoOnes}
                ></Input>

                <DamageTitle>Level 2s</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="oppoTwos"
                  defaultValue={this.state.oppoTwos}
                ></Input>

                <DamageTitle>Level 3s</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="oppoThrees"
                  defaultValue={this.state.oppoThrees}
                ></Input>

                <DamageTitle>CXs in opponent's deck</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="cx"
                  defaultValue={7}
                ></Input>
              </div>
              {/*  
              <br />
              <div>opponent's deck: {deckCards}</div>
              <br />
              <div>opponent's waiting room: {waitingRoomCards} </div>
              <br />
              <div>opponent's clock: {clockCards}</div>
        */}
            </Column1>
            <Column2>
              <DeckTitle>Your deck state</DeckTitle>
              <div>
                {/* amount of 0s in deck */}
                <DamageTitle>Level 0s left in your deck</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="zeros"
                  defaultValue={this.state.zeros}
                ></Input>

                {/* amount of 1s in deck */}
                <DamageTitle>Level 1s left in your deck</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="ones"
                  defaultValue={this.state.ones}
                ></Input>

                {/* amount of 2s in deck */}
                <DamageTitle>Level 2s left in your deck</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="twos"
                  defaultValue={this.state.twos}
                ></Input>

                {/* amount of 3s in deck */}
                <DamageTitle>Level 3s left in your deck</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="threes"
                  defaultValue={this.state.threes}
                ></Input>

                {/* amount of cxs in deck */}
                <DamageTitle>CXs left in your deck</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="yourCx"
                  defaultValue={this.state.yourCx}
                ></Input>

                {/* amount of triggers in deck */}
                <DamageTitle>+1 soul triggers left in your deck</DamageTitle>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="yourTriggers"
                  defaultValue={this.state.yourTriggers}
                ></Input>
              </div>
              {/* <br />
            <div>your deck: {yourDeckCards}</div>
            <br />
            <div>your waiting room: {yourWaitingRoomCards}</div> */}
            </Column2>
          </Container>
          <AttackColumn>
            <Buttons onClick={this.addAttack} padding="10px" width="178px">
              add more attacks
            </Buttons>
            {showAttackTypeArray}
          </AttackColumn>
        </BigContainer>
      </>
    );
  }
}

export default App;

const BigContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const DeckState = styled.div`
  height: 200px;
  width: 100%;
`;

const DamageTitle = styled.div`
  font-size: 15px;
`;

const DeckTitle = styled.div`
  font-size: 22px;
  padding-bottom: 15px;
`;

const DeckCards = styled.div`
  display: inline-block;
  margin: 2px;
  padding: 2px;
`;

const Input = styled.input`
  // width: 200px;
`;

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  width: calc(65% - 10px);
  vertical-align: top;
  grid-gap: 10px;
  margin-right: 10px;
`;

const Column1 = styled.div`
  background-color: rgb(240, 240, 240);
  padding: 20px;
  border-radius: 5px;
  display: grid;
  grid-column: 1/2;
  grid-row: 2/3;
`;

const Column2 = styled.div`
  background-color: rgb(240, 240, 240);
  padding: 20px;
  border-radius: 5px;
  display: grid;
  grid-column: 2/3;
  grid-row: 2/3;
`;

const AttackColumn = styled.div`
  background-color: rgb(240, 240, 240);
  padding: 20px;
  border-radius: 5px;
  width: 35%;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
`;

const PercentageTable = styled.div`
  background-color: rgb(240, 240, 240);
  border-radius: 5px;
  padding: 20px;
  // margin: 20px 20px 0 20px;
  display: grid;
  grid-column: 1/3;
  grid-row: 1/2;
  display: inline-block;
`;

const Buttons = styled.button`
  background-color: rgb(220, 220, 220);
  border: 3px solid rgb(220, 220, 220);
  padding: ${(props) => props.padding};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 5px;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};

  &:hover {
    border: 3px solid rgb(240, 240, 240);
  }
`;

const Table = styled.table`
  border: 3px solid rgb(220, 220, 220);
  border-radius: 5px;
  border-spacing: 0;
`;

const Td = styled.td`
  border: 1px solid rgb(220, 220, 220);
  min-width: 100px;
  padding: 5px;
`;
