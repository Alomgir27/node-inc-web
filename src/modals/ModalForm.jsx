import React, { useEffect, useState } from 'react';
import nodeAxios from '../utils/nodeAxios';

import Modal from './Modal';

const ModalForm = (props) => {
	const [forms, setForms] = useState([]);
	const [activeId, setactiveId] = useState();
	// const [currentPage, setCurrentPage] = useState(0);
	const [brakeForm, setbrakeForm] = useState('');
	const [inspectionForm, setInspectionForm] = useState('');
	const [batteryForm, setBatteryForm] = useState('');
	const brakeFormActive = () => {
		setbrakeForm('activeForm');
		setInspectionForm('');
		setBatteryForm('');
	};
	const inspectionFormActive = () => {
		setbrakeForm('');
		setInspectionForm('activeForm');
		setBatteryForm('');
	};
	const batteryFormActive = () => {
		setbrakeForm('');
		setInspectionForm('');
		setBatteryForm('activeForm');
	};
	let totalForms = [];

	const getForms = async (currentPage) => {
		const tokens = JSON.parse(localStorage.getItem('tokens'));

		fetch(
			`https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/form/all/${currentPage}`,
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
				totalForms = [...totalForms, ...data.forms];
				check(currentPage, data.totalRecords, [...totalForms, data.forms]);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const check = (curr, total, forms) => {
		if (totalForms.length >= total) {
			setForms(totalForms);
		} else {
			getForms(curr + 1);
		}
	};

	const [Trigger, setTrigger] = useState(true);

	useEffect(() => {
		setForms([]);
		totalForms.length === 0 && getForms(0);
	}, totalForms);

	const handelClick = (id) => {
		setactiveId(id);
	};

	return (
		<div>
			<Modal
				titleVector='./assets/vectors/modal-forms.svg'
				title='Forms'
				buttonText='Add'
				formID={activeId}
				addFormToService={props.addFormToService}
				{...props}
			>
				<div
					className='form-modal-body'
					style={{ height: '25vh', overflowY: 'auto' }}
				>
					{forms?.map((form, i) => {
						let { name, id } = form;
						return (
							<div
								key={i}
								className={id === activeId ? 'item activeForm' : 'item'}
							>
								<img src='./assets/vectors/form-img.svg' alt='form-img' />
								<div
									className='hover text-x-small dark'
									onClick={() => handelClick(id)}
								>
									{name}
								</div>
							</div>
						);
					})}
				</div>
			</Modal>
		</div>
	);
};

export default ModalForm;