import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Display = (props) => {
	const { dogs } = props;

	const loaded = (
		<div style={{ textAlign: 'center' }}>
			{dogs.map((dog) => (
				<article>
					<img src={dog.img} />
					<h1>{dog.name}</h1>
					<h3>{dog.age}</h3>
				</article>
			))}
		</div>
	);

	const loading = <Spinner animation='border' />;

	return dogs.length > 0 ? loaded : loading;
};

export default Display;
