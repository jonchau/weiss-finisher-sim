import React, { Component } from "react";
import styled from "styled-components";
import Shinano from "../images/shinano.jpg";
import Marine from "../images/marine.png";
import Malin from "../images/malin.jpg";
import Musashi from "../images/musashi.png";
import Towa from "../images/towa.png";
import ExampleBoard from "../images/examplefield.png";

class Disclaimer extends Component {
  state = {
    isMenuOpen: false, // Initial state, menu is closed
  };

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  render() {
    const { isMenuOpen } = this.state;
    return (
      <>
        <Container>
          <Buttons onClick={this.toggleMenu}>Additional Info</Buttons>
          {isMenuOpen && (
            <Content>
              <DescriptionContainer>
                <Description>
                  The simulator simulates 500 games played. Add the attacks and
                  effects you want, the order is from top to bottom of the list.
                  Click "take damage" to start simulations, you can click the
                  button as many times as you want to simulate more games, each
                  click will perform 500 simulations. (might lag, simulations
                  are performed one after another and not simulataneously)
                </Description>

                <Description>
                  1. SWING: Attacking normally, chance of triggering +1 soul is
                  equal to the amount of triggers you have in deck divided by
                  the total amount of cards in your deck.
                </Description>
                <DescriptionCards>
                  <Description>
                    2. BURN: Additional damage, you can put more than one at the
                    beginning of the attack list to simulate playing events that
                    burn. Ie. Marine (Hololive)
                  </Description>
                  <ExampleImage src={Marine}></ExampleImage>
                </DescriptionCards>

                <DescriptionCards>
                  <Description>
                    3. ON CANCEL BURN: You can put this effect after any
                    damaging attack/effect. It will be ignored if placed first
                    in the list of attacks and only works if placed after a
                    swing attack; none of the other effects check for this
                    effect on cancel of damage. Ie. Le Matin (Azur Lane)
                  </Description>
                  <ExampleImage src={Malin}></ExampleImage>
                </DescriptionCards>
                <DescriptionCards>
                  <Description>
                    4. MILL X BURN Y FOR Z: Mill x cards from the top of your
                    deck, and burn y (usually 1), z times; where z is the amount
                    of CXs milled. Ie. Shinano (Azur Lane)
                  </Description>
                  <ExampleImage src={Shinano}></ExampleImage>
                </DescriptionCards>
                <DescriptionCards>
                  <Description>
                    5. TOWA: Uncheck the box to have a level 0 (not cx) put onto
                    the bottom during the scry check. Although after testing,
                    this is objectively worse than leaving the 0 on top, you can
                    try for yourself though. (check notes at bottom for
                    problems)
                  </Description>
                  <ExampleImage src={Towa}></ExampleImage>
                </DescriptionCards>
                <DescriptionCards>
                  <Description>
                    5. MUSASHI: The chance of milling a particular card is based
                    off of the level of cards put in your deck. (check notes at
                    bottom for problems)
                  </Description>
                  <ExampleImage src={Musashi}></ExampleImage>
                </DescriptionCards>
                <Description>
                  PROBLEMS: The X button on the attacks does not work, just
                  refresh the page to try again. (too lazy to get the X button
                  working)
                </Description>
                <Description>
                  PROBLEMS: Making the opponent deck too small / having too
                  little cx in deck for the opponent and causing refresh while
                  using towa or mushashi effects will give incorrect results.
                  (pending fix, too lazy to write the code for it, most use
                  cases will not run into this problem)
                </Description>

                <Description>
                  PROBLEMS: If you write a number into the textbox for any of
                  the attacks, and then switch the attack type to some other
                  one, the same number will show up in the textbox, delete this
                  number and rewrite it again even if the number is what you
                  wanted. (the number in the textbox will update the wrong info
                  in state when switching option selects) Ie. writing 3 into the
                  textbox of "swing", then changing the attack type to "burn",
                  the new textbox will show the same number 3, but delete this
                  number and rewrite it.
                </Description>
                <br />
                <Description>EXAMPLE BOARD:</Description>
                <ExampleField src={ExampleBoard}></ExampleField>
              </DescriptionContainer>
            </Content>
          )}
        </Container>
      </>
    );
  }
}

export default Disclaimer;

const Container = styled.div`
  background-color: rgb(240, 240, 240);
  margin: 10px 0 10px 0;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
`;

const Buttons = styled.button`
  background-color: rgb(220, 220, 220);
  border: 3px solid rgb(220, 220, 220);
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 5px;

  &:hover {
    border: 3px solid rgb(240, 240, 240);
  }
`;

const Content = styled.div``;

const DescriptionContainer = styled.div`
  margin: 10px;
`;

const DescriptionCards = styled.div`
  display: grid;
  grid-template-columns: auto 250px;
`;

const Description = styled.div`
  margin: 10px 0;
`;

const ExampleImage = styled.img`
  margin: 10px 0 10px 15px;
  width: 100%;
`;

const ExampleField = styled.img`
  width: 100%;
`;
