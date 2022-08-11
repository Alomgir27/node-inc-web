import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

// import Select from "../c";
// import Option from "../components/select/option";
import WorkshopLayout from '../layouts/WorkshopLayout';
import Input from '../components/Input';
import AddBtn from '../components/AddBtn';
import FancyInput from '../components/FancyInput';
import ModalNode from '../modals/ModalNode';
import { useParams } from 'react-router-dom';
import ModalAddSub from '../modals/ModalAddSub';
import { inputDateFormate } from '../utilities/CommonUtilities';

const WorkshopRequests = () => {
	const { id } = useParams();

	const [request, setRequest] = useState({});
	const [subTasks, setSubTasks] = useState([]);
	const [user, setUser] = useState({});
	const [startDate, setStartDate] = useState(new Date());
	const [startDate2, setStartDate2] = useState(new Date());
	const [nodeModalOpenState, setNodeModalOpenState] = useState(false);
	const [subTaskModalOpenState, setSubTaskModalOpenState] = useState(false);
	const [allEmployees, setAllEmployees] = useState([]);

	const modalOpenHandler = (func) => {
		func(true);
	};

	const modalCloseHandler = (func) => {
		func(false);
	};

	const allStatus = [
		{ name: 'Requested', id: 0 },
		{ name: 'Approved', id: 1 },
		{ name: 'In progress', id: 2 },
		{ name: 'Denied', id: 3 },
		{ name: 'Done', id: 4 },
		{ name: 'On hold', id: 5 },
		{ name: 'Archived', id: 6 },
	];
	const updateStatus = (e) => {
		let statusCode = Number(e.target.value.split('_')[0]);
		const tokens = JSON.parse(localStorage.getItem('tokens'));

		fetch(
			`https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/request/${id}/status`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
				body: JSON.stringify({ id: id, status: statusCode }),
			},
		)
			.then((response) => {
				console.log(response);
				fetchRequest();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchRequest = async () => {
		const tokens = JSON.parse(localStorage.getItem('tokens'));
		console.log(tokens);
		fetch(
			'https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/request/req/' +
				id,
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
				console.log(data.request);
				fetchUser(localStorage.getItem('invoice_target_entity_id'));
				setRequest(data.request);

				localStorage.setItem(
					'request_due_date',
					inputDateFormate(data.request.due_date),
				);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchUser = (entity_id) => {
		const tokens = JSON.parse(localStorage.getItem('tokens'));

		fetch(
			'https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/entity/' +
				entity_id,
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
				setUser(data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchEmployees = async () => {
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

	const dueDateChangeHandler = (e) => {
		let { name, value } = e.target;
		const tokens = JSON.parse(localStorage.getItem('tokens'));

		fetch(
			`
			https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/request/details/` +
				id,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
				body: JSON.stringify({
					desc: request.desc.data,
					[name]: value,
					name: request.name,
				}),
			},
		)
			.then((response) => {
				console.log(response);
				fetchRequest();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const assignedToChangeHandler = (e) => {
		let { name, value } = e.target;
		if (name == 'target_user_id') {
			value = value.split('_')[1];
		}
		const tokens = JSON.parse(localStorage.getItem('tokens'));

		fetch(
			`
			https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/request/details/` +
				id,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
				body: JSON.stringify({
					desc: request.desc.data,
					[name]: value,
					name: request.name,
				}),
			},
		)
			.then((response) => {
				console.log(response);
				fetchRequest();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchAllSubTasks = () => {
		const tokens = JSON.parse(localStorage.getItem('tokens'));

		fetch(
			`https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod
			/request/subtasks/` + id,
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
				console.log('all sub-tasks', data.subtasks);
				setSubTasks(data.subtasks);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchEmployees();
		fetchRequest();
		fetchAllSubTasks();
	}, [subTaskModalOpenState]);

	return (
		<WorkshopLayout title='Requests'>
			<div className='requests-container'>
				<div className='container-fluid px-0'>
					<div className='row gy-4'>
						<div className='col-lg-8'>
							<div className='row gy-5 gx-xxl-5'>
								<div className='col-md-8'>
									<div className='d-flex justify-content-between'>
										<div className='section-title'>
											{request?.name}
											<br></br>
											<p>Request #{request?.id}</p>
										</div>
									</div>

									<div className='mt-4 mb-3 card changes emboss-white br-16'>
										<div className='container-fluid px-0'>
											<div className='row'>
												<div className='col-md-6'>
													<FancyInput
														select
														options={[
															...allStatus.map((item) => {
																return {
																	text: item.id + '_ ' + item.name,
																	disabled: false,
																	selected: item.id === request?.status,
																};
															}),
														]}
														id='client'
														name='client'
														placeholder='Select in the menu'
														rootClassName='appointment-select'
														inputClassName='custom-select'
														onChange={updateStatus}
													/>

													<div className='textarea-container'>
														<Input
															className='fw-400'
															rows={9}
															label='Description'
															textArea
															value={request?.desc?.data}
														/>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='mb-3'>
														<FancyInput
															select
															options={[
																{
																	text: 'Internal',
																	disabled: true,
																	selected: true,
																},
															]}
															id='client'
															name='client'
															placeholder='Select in the menu'
															rootClassName='appointment-select'
															inputClassName='custom-select'
														/>
													</div>
													<div className='mb-3'>
														<FancyInput
															select
															options={[
																{
																	text: localStorage.getItem('invoiceClient'),
																	disabled: true,
																	selected: true,
																},
															]}
															id='client'
															name='client'
															placeholder='Select in the menu'
															rootClassName='appointment-select'
															inputClassName='custom-select'
														/>
													</div>
													<div className='mb-3'>
														<FancyInput
															select
															options={[
																...allEmployees?.map((item) => {
																	return {
																		text: item.human_identity_id.first_name,
																		disable: false,
																		selected:
																			request?.target_user_id?.id === item?.id,
																	};
																}),
															]}
															id='client'
															name='target_user_id'
															placeholder='Select in the menu'
															rootClassName='appointment-select'
															inputClassName='custom-select'
															onChange={assignedToChangeHandler}
														/>
													</div>

													<div className='date-picker-root mb-3'>
														<FancyInput
															sMargin
															id='date'
															type='date'
															name='created_at'
															placeholder='start time'
															inputClassName='dateInput'
															value={inputDateFormate(request?.created_at)}
														/>
													</div>
													<div className='date-picker-root'>
														<FancyInput
															sMargin
															id='date'
															type='date'
															name='due_date'
															placeholder='Due Date'
															inputClassName='dateInput'
															value={inputDateFormate(request?.due_date)}
															onChange={dueDateChangeHandler}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-4'>
									<div className='px-md-3'>
										<div className='d-flex justify-content-between align-items-center'>
											<h3 className='section-title fs-18'>Sub-Elements</h3>
											<ModalAddSub
												isOpen={subTaskModalOpenState}
												modalCloseHandler={() =>
													modalCloseHandler(setSubTaskModalOpenState)
												}
												requestData={request}
											/>
											<AddBtn
												onClick={() =>
													modalOpenHandler(setSubTaskModalOpenState)
												}
												pale
											/>
										</div>

										<div className='sub-tasks'>
											{subTasks?.map((el, idx) => {
												return (
													<div
														key={'sub-task' + idx}
														className={`sub-task${
															el.is_completed ? ' checked' : ''
														}`}
													>
														<Input
															defaultChecked={el.checked}
															greenCheckbox
															options={[{ text: el.task }]}
															checkbox
														/>
														<div>
															{/* {!el.due_date && (
																<img
																	src='./assets/vectors/calender-4.svg'
																	alt='calender1'
																/>
															)} */}
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
								<div className='col-md-5'>
									<div className='user-info mb-4 d-flex align-items-start flex-wrap'>
										<div className='d-flex'>
											<img
												className='ms-2 mb-2'
												width={42}
												src='../assets/vectors/user-placeholder.svg'
												alt='client'
											/>
											<div className='ms-4'>
												<h3
													className='section-title'
													onClick={() => console.log(user)}
												>
													{user?.human_identity_id?.first_name}{' '}
													{user?.human_identity_id?.last_name}
												</h3>

												<div className='fs-12 text'>
													Card #{request?.invoice_id?.auto_id}
												</div>
											</div>
										</div>
									</div>

									<div className='card profiles-main emboss-white br-16 mt-3 d-block'>
										<div className='left'>
											<div className='item emboss-md-inner p-4'>
												<div className='text'>
													<div className='text-dark-3 fw-600 p'>
														2020 Toyota Prius Prime
													</div>
													<h5 className='sub-title'>JFTK9887263312</h5>
													<div className='text-dark-3 fw-400 fs-7 text-manrope d-flex align-items-center'>
														Noded &amp; Validated
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6'>
									<div className='d-flex justify-content-between title-container'>
										<div className='title'>
											<h3 className='section-title text-dark-1 fs-18'>
												Internal notes
											</h3>
										</div>
									</div>

									<div className='comments mt-4'>
										<div className='emboss-white p-4 br-16'>
											{request?.metadata?.map((el, idx) => {
												const { name, task, date, edit, editDate, attachment } =
													el;

												return (
													<div key={'comment' + idx} className='comment-item'>
														<div className='img'>
															<img
																src='../assets/vectors/comment-user.svg'
																alt='comment-user'
															/>
														</div>
														<div className='text'>
															<div className='text-1 fs-13'>
																{name + ' ' + task}{' '}
																<span className='text-light-5 fs-11'>
																	{date}
																</span>
															</div>
															{edit && (
																<div className='text-2'>
																	<span className='fs-11 fw-600'>{name}</span>{' '}
																	<span className='fs-11 fw-500'> {edit}</span>{' '}
																	<span className='text-light-5 fs-11'>
																		{editDate}
																	</span>
																</div>
															)}
															{attachment && (
																<div className='attachment'>
																	<img
																		src={attachment}
																		alt='name'
																		width='50%'
																	/>
																</div>
															)}
														</div>
													</div>
												);
											})}
										</div>
										<div className='comment-item mt-4 row d-flex justify-content-around '>
											<div className='text col-10'>
												<FancyInput
													sMargin
													id='name'
													name='name'
													placeholder='Add a comment on this request...'
												/>
											</div>
											<div className='col-2'>
												<button className='ms-3 btn btn-gradient'>Post</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-lg-4'>
							<h3 className='section-title mb-3 fs-18 px-4'>Messages</h3>

							<div className='right-chat-main-content'>
								<div className='main-chat'>
									<div className='chat-main-body mb-4 p-4 px-4'>
										{[
											{
												type: 'msg',
												userImg: '../assets/vectors/chat-user-1.svg',
												msgContents: [
													{
														type: 'text',
														text: 'Recently I saw properties in a great location that I did not pay attention to before😄',
													},
												],
												msgTime: '1 day ago',
											},
											{
												me: true,
												type: 'msg',
												userImg: '../assets/img/chat-me.png',
												msgContents: [
													{
														type: 'text',
														text: 'I am interested to know more about your prices and services you offer',
													},
												],
												msgTime: '1 day ago',
											},
											{
												type: 'timetag',
												date: 'Today',
											},
											{
												type: 'msg',
												userImg: '../assets/vectors/chat-user-1.svg',
												msgContents: [
													{
														type: 'text',
														text: 'I’ll raise a retun request for you. Here are the instructions to get the package ready for return. The return process will take max 2 days depends on the traffic return exclude the shipping',
													},
												],
												msgTime: '2 min ago',
											},
											{
												me: true,
												type: 'msg',
												userImg: '../assets/img/chat-me.png',
												msgContents: [
													{
														type: 'text',
														text: 'I am interested to know more about your prices and services you offer',
													},
												],
												msgTime: 'just now',
											},
										].map((el, idx) => {
											const { type, userImg, msgContents, msgTime, me, date } =
												el;

											if (type === 'msg') {
												return (
													<div
														key={'msgs' + idx}
														className={`chat-msg${me ? ' me' : ''}`}
													>
														{msgContents.map((item, idx2) => {
															const { type, text, info } = item;
															return (
																<div
																	className='msg-body'
																	key={'msg' + idx + idx2}
																>
																	<div className='img'>
																		<img
																			src={userImg}
																			alt='user-img'
																			width='50px'
																		/>
																	</div>
																	<div className='text'>
																		{type === 'text' ? (
																			<div className='chat-text'>{text}</div>
																		) : (
																			<div className='file-container'>
																				<div className='file-desc'>
																					<img
																						src='../assets/vectors/file-icon.svg'
																						alt='file'
																					/>
																					<div className='file-text'>
																						<div className='chat-text'>
																							{text}
																						</div>
																						<div className='chat-text'>
																							{info}
																						</div>
																					</div>
																				</div>
																				<img
																					className='download'
																					src='../assets/vectors/file-download.svg'
																					alt='download'
																				/>
																			</div>
																		)}
																	</div>
																</div>
															);
														})}
														<div className='msg-foot'>
															<div className='time'>{msgTime}</div>
														</div>
													</div>
												);
											} else {
												return (
													<div className='timetag-container' key={'foot' + idx}>
														<div className='time-tag'>
															<div className='tag'>{date}</div>
														</div>
													</div>
												);
											}
										})}
									</div>
								</div>
								<div className='new-msg pt-4 d-flex align-items-center px-4'>
									<FancyInput
										textArea
										sMargin
										id='notes'
										type='text'
										name='notes'
										placeholder='Write a message'
									/>
									<div>
										<div className='ms-4 btn btn-send btn-gradient'>Send</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</WorkshopLayout>
	);
};

export default WorkshopRequests;
