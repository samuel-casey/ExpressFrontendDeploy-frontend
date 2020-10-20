import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Display = (props) => {
	const { dogs } = props;

	const loaded = (
		<div style={{ textAlign: 'center' }}>
			{dogs.map((dog, index) => (
				<article key={index}>
					<img src={dog.img} alt={dog.name} />
					<h1>{dog.name}</h1>
					<h3>Age: {dog.age}</h3>
					<button
						className='edit'
						onClick={() => {
							props.selectDog(dog);
							props.history.push('/edit');
						}}>
						Edit
					</button>
					<button
						onClick={() => {
							props.deleteDog(dog);
						}}
						className='delete'>
						Delete
					</button>
				</article>
			))}
		</div>
	);

	const loading = <Spinner animation='border' />;

	return dogs.length > 0 ? loaded : loading;
};

export default Display;
