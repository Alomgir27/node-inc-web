import React, { useState, useEffect } from 'react';

import Modal from './Modal';
import FancyInput from '../components/FancyInput';

const ModalPasses = (props) => {
	const [allEmployees, setAllEmployees] = useState([]);

	const [passInputs, setInputPass] = useState({
		status: 1,
		timer: 0,
		assigned_to: "",
	});

	const changeHandler = (event) => {
		let { name, value } = event.target;
		console.log(name, value);
		if (name === 'assigned_to') {
			value = value.split('_')[1];
		}
		setInputPass({
			...passInputs,
			[name]: value,
		});
	};

	const submitHandler = () => {
		props.savePass(passInputs);
	};

	const getAllEmployees = async () => {
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
		getAllEmployees();
	}, []);

	return (
		<div>
			<Modal
				title='Passes'
				buttonText='Define'
				addPass={submitHandler}
				{...props}
			>
				<div className='schedule-modal-body p-3'>
					<div className='row'>
						<div className='col-sm-12 mb-3'>
							<p className='text mb-2'>Name</p>
							<FancyInput
								sMargin
								id='name'
								type='text'
								name='name'
								value={passInputs.name}
								onChange={changeHandler}
							/>
						</div>
						<div className='col-sm-6 mb-3'>
							<p className='text mb-2'>Start time</p>
							<FancyInput
								sMargin
								id='date'
								type='datetime-local'
								name='startDate'
								value={passInputs.startDate}
								onChange={changeHandler}
								placeholder='DD/MM/AA   at 00:000'
								inputClassName='dateInput'
							/>
						</div>
						<div className='col-sm-6 mb-3'>
							<p className='text mb-2'>End time</p>
							<FancyInput
								sMargin
								id='date'
								type='datetime-local'
								name='endDate'
								value={passInputs.endDate}
								onChange={changeHandler}
								placeholder='DD/MM/AA   at 00:000'
								inputClassName='dateInput'
							/>
						</div>
						<div className='col-sm-4 mb-3'>
							<p className='text mb-2'>Assign To</p>
							<FancyInput
								select
								options={[
									...allEmployees?.map((item) => {
										return {
											text: item.human_identity_id.first_name + '  _ ' + item.id,
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
								id='category'
								name='assigned_to'
								placeholder='Select Category'
								rootClassName='appointment-select'
								inputClassName='custom-select'
								value={passInputs.endDate}
								onChange={changeHandler}
							/>
						</div>
						<div className='col-sm-4 mb-3'>
							<p className='text mb-2'>Timer</p>
							<FancyInput
								select
								options={[
									{
										text: passInputs.timer,
										disabled: false,
										selected: true,
									},
								]}
								id='category'
								name='timer'
								placeholder='Select Category'
								rootClassName='appointment-select'
								inputClassName='custom-select'
							/>
						</div>
						<div className='col-sm-4 mb-3'>
							<p className='text mb-2'>Status</p>
							<FancyInput
								select
								options={[
									{
										text: passInputs.status === 1 ? 'Active' : 'Inactive',
										disabled: false,
										selected: true,
									},
								]}
								id='category'
								name='status'
								placeholder='Select Category'
								rootClassName='appointment-select'
								inputClassName='custom-select'
							/>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ModalPasses;
