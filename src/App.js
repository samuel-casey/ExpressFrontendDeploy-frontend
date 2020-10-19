import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './Display';
import Form from './Form';

function App() {
	const dogsAPIURL = 'http://localhost:5555';
	const [dogs, setDogs] = useState([]);

	// const dogImgs = [
	// 	'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d',
	// 	'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=1080',
	// 	'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg&w=1440',
	// 	'https://scx2.b-cdn.net/gfx/news/hires/2018/2-dog.jpg',
	// 	'https://i.insider.com/5efe3d7faee6a8324a656478?width=1100&format=jpeg&auto=webp',
	// ];

	// const dogImgIdx = Math.random(Math.floor() * dogImgs.length);

	const emptyDog = {
		name: '',
		age: 0,
		img: '',
	};

	const getDogs = () => {
		fetch(dogsAPIURL + '/dog/')
			.then((response) => response.json())
			.then((data) => {
				setDogs(data);
			});
	};

	useEffect(() => {
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
						render={(rp) => <Display dogs={dogs} {...rp} />}
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
							<Form {...rp} label='update' dog={{}} handleSubmit={() => {}} />
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;
