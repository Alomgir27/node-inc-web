import React, { useState } from 'react';

import Modal from './Modal';
import FancyInput from '../components/FancyInput';
import { useParams } from 'react-router-dom';

const ModalAddSub = (props) => {
	const [subtask, setsubtask] = useState({
		task: '',
		data: {},
		due_date: localStorage.getItem('request_due_date'),
	});
	const { id } = useParams();

	const changeHandler = (event) => {
		const { name, value } = event.target;
		setsubtask({
			...subtask,
			[name]: value,
		});
	};
	const createNewSubTask = () => {
		const tokens = JSON.parse(localStorage.getItem('tokens'));
		fetch(
			'https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/request/subtasks/' +
				String(id),
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
				body: JSON.stringify({
					...subtask,
					assign_to: props?.requestData?.target_user_id?.id,
					is_completed: false,
				}),
			},
		)
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div>
			<Modal
				addSubTask={createNewSubTask}
				buttonText='Add'
				className='node-modal'
				bodyClassName='node-modal-body-container'
				{...props}
			>
				<div className='node-modal-body'>
					<h3 className='mb-3 section-title'>Add Sub-Element</h3>
					<FancyInput
						text
						id='sub'
						name='task'
						placeholder='Type an element to add'
						rootClassName='appointment-select'
						value={subtask.name}
						onChange={changeHandler}
					/>
					<br />
				</div>
			</Modal>
		</div>
	);
};

export default ModalAddSub;