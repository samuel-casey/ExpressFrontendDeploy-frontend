import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import dotenv from 'dotenv';
import Display from './Display';
import Form from './Form';

dotenv.config();

const TEST = process.env.TEST;

const prod = true;

function App() {
	const dogsAPIURL = prod
		? 'https://dogsapibackend.herokuapp.com'
		: 'http://localhost:5555';
	const [dogs, setDogs] = useState([]);

	const emptyDog = {
		name: '',
		age: 0,
		img: '',
	};

	const [selectedDog, setSelectedDog] = useState(emptyDog);

	const getDogs = () => {
		fetch(dogsAPIURL + '/dog/')
			.then((response) => response.json())
			.then((data) => {
				setDogs(data);
			});
	};

	// load dogs on page load
	useEffect(() => {
		console.log(TEST);
		getDogs();
	}, []);

	const handleCreate = (newDog) => {
		fetch(dogsAPIURL + '/dog/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newDog),
		}).then(() => {
			getDogs();
		});
	};

	const handleUpdate = (dog) => {
		fetch(dogsAPIURL + '/dog/' + dog._id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dog),
		}).then(() => {
			getDogs();
		});
	};

	const selectDog = (dog) => {
		setSelectedDog(dog);
	};

	const deleteDog = (dog) => {
		fetch(dogsAPIURL + '/dog/' + dog._id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application.json',
			},
		}).then(() => {
			getDogs();
		});
	};

	return (
		<div className='App'>
			<h1>DOG LISTING SITE</h1>
			<hr />
			<main>
				<Link to='/create'>
					<button>Add a dog</button>
					<br></br>
					<br></br>
				</Link>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => (
							<Display
								dogs={dogs}
								deleteDog={deleteDog}
								selectDog={selectDog}
								{...rp}
							/>
						)}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form
								{...rp}
								label='create'
								dog={emptyDog}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form
								{...rp}
								label='update'
								dog={selectedDog}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;
