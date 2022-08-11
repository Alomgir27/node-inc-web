import React, { useState, useEffect, useContext } from 'react';

import Modal from './Modal';
import FancyInput from '../components/FancyInput';
import AddBtn from '../components/AddBtn';
import Input from '../components/Input';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';
import { sendNetworkRequest, BASEURL } from '../http/http-request';

const ModalRequests = (props) => {
	const [allSubTasks, setAllSubTasks] = useState([]);
	const [allEmployees, setAllEmployees] = useState([]);
	const [subTask, setSubTask] = useState();
	const [newRequest, setNewRequest] = useState({
		invoice_id: localStorage.getItem('invoiceId'),
	});

	const handalAddSubTask = () => {
		setAllSubTasks([...allSubTasks, subTask]);
	};

	const deleteTask = (e) => {
		let tasks = allSubTasks.splice(e.target.id, e.target.id);
		setAllSubTasks(tasks);
	};

	const changeHandler = (event) => {
		let { name, value } = event.target;
		if (name == 'target_user_id') {
			value = value.split('_')[1];
		}
		setNewRequest({
			...newRequest,
			[name]: value,
		});
	};

	const onCreateNewRequest = (e) => {
		let request = {
			...newRequest,
			target_entity_id: allEmployees?.find(
				(state) => state.id === newRequest.target_user_id,
			)?.entity_id?.id,
		};

		const tokens = JSON.parse(localStorage.getItem('tokens'));
		fetch(
			'https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/request',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
				body: JSON.stringify(request),
			},
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchRequest = async () => {
		const tokens = JSON.parse(localStorage.getItem('tokens'));

		fetch(
			'https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/core/employees',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
			},
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				setAllEmployees(data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchRequest();
	}, []);

	return (
		<div>
			<Modal
				addTask={onCreateNewRequest}
				title='New Request'
				buttonText='Add'
				{...props}
			>
				<div className='row'>
					<div className='col-sm-6'>
						<p className='mt-2'>Request Name</p>
						<FancyInput
							prominant
							sMargin
							id='vin'
							name='name'
							placeholder='Start typing...'
							onChange={changeHandler}
							value={newRequest?.name}
							//   onChange={(e) => setSerial(e.target.value)}
						/>
					</div>
					<div className='col-sm-6'>
						<p className='mt-2'>Due Date</p>
						<FancyInput
							sMargin
							id='date'
							type='date'
							name='due_date'
							//   onChange={inputChangeHandler}
							placeholder='DD/MM/AA   at 00:000'
							inputClassName='dateInput'
							onChange={changeHandler}
							value={newRequest?.due_date}
						/>
					</div>

					<div className='col-sm-6'>
						<p className='mt-2'>Assign to</p>
						<FancyInput
							select
							options={[
								...allEmployees?.map((item) => {
									return {
										text: item.human_identity_id.first_name + ' _' + item.id,
										disable: false,
										selected: true,
									};
								}),
								{
									text: 'Select the menu',
									disable: true,
									selected: true,
								},
							]}
							id={'client'}
							name='target_user_id'
							placeholder='Select in the menu'
							rootClassName='appointment-select'
							inputClassName='custom-select'
							onChange={changeHandler}
						/>
					</div>
					<div className='col-sm-6'>
						<p className='mt-2'>Type</p>
						<FancyInput
							select
							options={[
								{
									text: 'Internal',
									disable: true,
									selected: true,
								},
                {
									text: 'Approval',
									disable: true,
									selected: true,
								},
                {
									text: 'Order',
									disable: true,
									selected: true,
								},
                {
									text: 'Appointment',
									disable: true,
									selected: true,
								},
							]}
							id='client'
							name='nodedwith'
							placeholder='Select in the menu'
							rootClassName='appointment-select'
							inputClassName='custom-select'
							value={newRequest?.target_user_id}
						/>
					</div>
					<div className='col-sm-12'>
						<p className='mt-2'>Description</p>
						<FancyInput
							sMargin
							textArea
							id='notes'
							type='text'
							name='desc'
							//   onChange={inputChangeHandler}
							placeholder='Add notes on this Appointment'
							onChange={changeHandler}
							value={newRequest?.desc}
						/>
					</div>
					<div>
						<div className='d-flex justify-content-between mt-5 align-items-center'>
							<FancyInput
								prominant
								sMargin
								id='subtask'
								name='subtask'
								placeholder='Sub Task'
								onChange={(e) => setSubTask(e.target.value)}
							/>
							<AddBtn small pale onClick={handalAddSubTask} />
						</div>
						{/* <Input
              options={[{ text: "Call client for follow & get approval" }]}
              checkbox
            />
            <Input options={[{ text: "Order Front brake pad" }]} checkbox /> */}
						{allSubTasks.map((item, i) => {
							return (
								<div className='d-flex justify-content-between sub-tasks'>
									<Input options={[{ text: item }]} checkbox className='m-0' />
									<img
										id={i}
										src='./assets/vectors/delete.svg'
										alt='delete'
										onClick={deleteTask}
										className='hover'
									/>
								</div>
							);
						})}
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ModalRequests;