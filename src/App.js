import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import MonthCard from './components/monthCard.jsx';

export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
      months: []
    }
  }
  
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(){
    if (this.state.months.length === 0) {
      this.getAllMonthes();
    }
  }

//Receiving users data
  getData = () => {
    fetch(`https://yalantis-react-school-api.yalantis.com/api/task0/users`)
    .then(response=> response.json())
    .then((data) => {
      this.setState({
        users: data
      });
    });
  }

  //Getting month if birth of each user
  extractDate = value => {
    const options = { month: 'long'};
    const date = new Date(value);
    const month = date.toLocaleDateString('ua-UA', options);
    return month;
  }

  sortMonths = (a, b) => {
    var correctMonthsOrder = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
    return correctMonthsOrder.indexOf(a) - correctMonthsOrder.indexOf(b);
  }

  getAllMonthes = () => {
    const allMonths = [];
    const allUsers = this.state.users;
    allUsers.map(user => {
      var date = this.extractDate(user.dob);
      if (!allMonths.includes(date)) {
        allMonths.push(date);
      }
      return allMonths.sort(this.sortMonths);
    });
    this.setState({
        months: allMonths
      }, function () {console.log("state of months - ", this.state.months);
    });  
  }
  
  capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

//Extracting array of users certain month
  getArrayOfUsers = (month) => {
    const allUsers = this.state.users;
    var arrayOfUsers = allUsers.filter(user => {
      return month === this.extractDate(user.dob);
    });
    return arrayOfUsers;
  }

//Coloring blocks of months depends on quantity
  countUserEachMonth = (month) => {
    
    var usersOfMonth = this.getArrayOfUsers(month);

    if(usersOfMonth.length >= 0 && usersOfMonth.length <= 2) {
      return "secondary";
    } else if (usersOfMonth.length >= 3 && usersOfMonth.length <= 6) {
      return "primary";
    } else if (usersOfMonth.length >= 7 && usersOfMonth.length <= 10) {
      return "success";
    } else {
      return "danger";
    }
  }

  render() {
    return (
      <div>
      <Container>
          <Row className="mb-4 mt-4">
            <Col >
              <h3 className="text-center">Дни рождения наших пользователей</h3>
            </Col>
          </Row>
          <Row className="justify-content-around">
            {this.state.months.map((month,index) => {
              return (
                 <Col sm="4" md="3" key={index}>
                    <MonthCard 
                      countUserEachMonth={this.countUserEachMonth}
                      month={month}
                      capitalize={this.capitalize}
                      arrayOfUsers={this.getArrayOfUsers(month)}
                    />
                </Col>
                );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}


export default App;
