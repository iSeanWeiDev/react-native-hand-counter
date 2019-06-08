import React, { Component } from "react";
import { TouchableOpacity, View, Image, Dimensions } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Text,
  Button,
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {
  withSafeArea,

} from 'react-native-safe-area-view';
import { Player } from 'react-native-audio-toolkit';

import styles from "./styles";

const options = [
  {label: 'Boarding', value: 0 },
  {label: 'Debarking', value: 1 },
  {label: 'Adjust', value: 2 },
];
const entireScreenWidth = Dimensions.get('window').width;
const rem = entireScreenWidth / 360

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
  };

  state = {
    currentOption: 0,
    number: 0,
    lockedNumber: 0
  };

  promiseSerial = funcs => {
    return funcs.reduce((promise, func) => {
      return promise.then(result => {
        return func().then(() => {
          return Array.prototype.concat.bind(result);
        });
      });
    }, Promise.resolve([]));
  }

  synthesizeSound = () => {
    const { number } = this.state;
    const thousand = parseInt(number / 1000);
    const hundred = parseInt((number % 1000) / 100);
    const tens = parseInt((number % 1000) % 100);
    const elements = [];

    if (thousand != 0) {
      elements.push(`${thousand}000`);
    }

    if (hundred != 0) {
      elements.push(`${hundred}00`);
    }

    elements.push(`${tens}`);

    this.promiseSerial(elements.map(ele => {
      return () => {
        return new Promise((resolve, reject) => {
          new Player(`${ele}.wav`, { autoDestroy: true })
            .play()
            .on('ended', err => {
              if (err) {
                console.log('error occured', err);
                reject(err);
              } else {
                resolve();
              }
            });
        });
      };
    }));
  }

  handleSelectMenu = option => {
    this.setState({ currentOption: option });
  }

  handleEngage = () => {
    const { currentOption, number, lockedNumber } = this.state;

    if (currentOption === 0) {
      this.setState({
        number: number + 1,
        lockedNumber: lockedNumber + 1
      }, this.synthesizeSound)
    } else if (currentOption === 1) {
      if (number > 0) {
        this.setState({ number: number - 1 }, this.synthesizeSound)
      }
    } else {
      if (number > 0) {
        this.setState({
          number: number - 1,
          lockedNumber: lockedNumber - 1
        }, this.synthesizeSound)
      }
    }
  }

  handleEndClick = () => {
    this.setState({ number: 0, lockedNumber: 0 })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Image source={require('../../../assets/images/backgroundImage.jpg')} style={styles.background}>
          <Grid>
            <Row size={2}>
              <Col size={1} style={styles.menuViewCol}>
                <View>
                  <RadioForm
                    radio_props={options}
                    initial={0}
                    buttonColor={'#50C900'}
                    buttonSize={30}
                    labelStyle={styles.menuTitle}
                    onPress={this.handleSelectMenu}
                  />
                  {this.state.currentOption === 1 && (
                    <Button bordered dark style={styles.endButton} onPress={this.handleEndClick}>
                      <Text style={styles.endButtonTitle}>End</Text>
                    </Button>
                  )}
                </View>
                {/* <RadioForm
                  animation={true}
                >
                  {options.map((option, i) => {
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={option}
                        index={i}
                        isSelected={this.state.currentOption === i}
                        onPress={this.handleSelectMenu}
                        borderWidth={1}
                        buttonInnerColor={'#e74c3c'}
                        buttonOuterColor={this.state.currentOption === i ? '#2196f3' : '#000'}
                        buttonSize={40}
                        buttonOuterSize={80}
                        buttonStyle={{}}
                        buttonWrapStyle={{marginLeft: 10}}
                      />
                      <RadioButtonLabel
                        obj={option}
                        index={i}
                        labelHorizontal={true}
                        onPress={this.handleSelectMenu}
                        labelStyle={{fontSize: 20, color: '#2ecc71'}}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  })}
                </RadioForm> */}
                {/* <MultipleChoice
                  options={options.map(option => option.label)}
                  selectedOptions={[this.state.currentOption]}
                  maxSelectedOptions={1}
                  renderSeparator={() => <View style={styles.menuSeparator} />}
                  renderText={option => (
                    <View style={styles.menu}>
                      <H2>{option}</H2>
                    </View>
                  )}
                  onSelection={option => this.handleSelectMenu(option)}
                /> */}
              </Col>
              <Col size={1} style={styles.lockedViewCol}>
                <View style={[styles.lockedView, styles.centeredArea]}>
                  <Text style={styles.lockedNumber}>{this.state.lockedNumber}</Text>
                </View>
              </Col>
            </Row>
            <Row size={4}>
              <TouchableOpacity style={styles.engagedView} onPress={this.handleEngage}>
                <Text style={{
                  ...styles.engagedNumber,
                  fontSize: this.state.number >= 100 ? 100 * rem : 150 * rem
                }}>{this.state.number}</Text>
              </TouchableOpacity>
            </Row>
          </Grid>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
  };
}
const mapStateToProps = state => ({
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);

export default withSafeArea()(HomeSwagger);
