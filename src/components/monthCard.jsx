import React, { Component } from 'react';

import { Card, Button, ListGroup } from 'react-bootstrap';

export class MonthCard extends Component {
	constructor () {
		super ();

		this.state = {
			showUsers: false
		}
	}

	render() {
		const { countUserEachMonth, month, capitalize, arrayOfUsers } = this.props;
		return (
				<Card style={{ width: '17rem' }} bg={countUserEachMonth(month)} className="m-2">
          <Card.Body>
            <Card.Title>{capitalize(month)}</Card.Title>
            <Button 
                variant="outline-light" 
                size="sm"
                onClick={() => {
                  this.setState({
                    showUsers: !this.state.showUsers
                   });
                  console.log(this.state.showUsers);
                  }}
            >
            Смотреть пользователей</Button>
            {this.state.showUsers ? 
              (<ListGroup className="mt-2">
                {arrayOfUsers.map((userOfThisMonth, index) => (
                  <ListGroup.Item key={index} bsPrefix="list-group-transparent">
										{userOfThisMonth.firstName}
                  </ListGroup.Item>
                ))}
              </ListGroup>) : null
            }
          </Card.Body>
        </Card>
		);
	}
}

export default MonthCard;