import React, { useEffect, useState } from 'react';
import AddBtn from '../components/AddBtn';
import { Link } from 'react-router-dom';

import Tabs from '../components/Tabs';
import WorkshopLayout from '../layouts/WorkshopLayout';
import ModalOrder from '../modals/Modalrequests';
import { BASEURL, sendNetworkRequest } from '../http/http-request';
import { useParams } from 'react-router-dom';
import { inputDateFormate } from '../utilities/CommonUtilities';

const WorkshopRequests = () => {
	const { id } = useParams();
	const [isModalOpenState, setIsModalOpenState] = useState(false);
	const [requestList, setRequestList] = useState([]);
	const modalOpenHandler = () => {
		setIsModalOpenState(true);
	};

	const modalCloseHandler = () => {
		setIsModalOpenState(false);
	};

	// const fetchRequest = async function fetchRequest() {
	// 	try {
	// 		sendNetworkRequest(`${BASEURL}/request/1`, 'GET', '')
	// 			.then((response) => {
	// 				const request = response.data.requests;
	// 				console.log(response.data.requests);
	// 				setRequestList(request);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	} catch (error) {}
	// };

	let requests = [];
	const fetchRequest = async (page) => {
		const tokens = JSON.parse(localStorage.getItem('tokens'));
		console.log(tokens);
		fetch(
			`https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod
			/request/type/owner/` + page,
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
				if (data.requests.length > 0) {
					requests = [...requests, ...data.requests];
					fetchRequest(page + 1);
				} else {
					setRequestList(requests);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchRequest(0);
	}, []);

	const allStatus = [
		{ name: 'Requested', id: 0, class: 'requested' },
		{ name: 'Approved', id: 1, class: 'progress' },
		{ name: 'In progress', id: 2, class: 'todo' },
		{ name: 'Denied', id: 3, class: 'hold' },
		{ name: 'Done', id: 4, class: 'done' },
		{ name: 'On hold', id: 5, class: 'hold' },
		{ name: 'Archived', id: 6, class: 'done' },
	];

	return (
		<WorkshopLayout>
			<ModalOrder
				isOpen={isModalOpenState}
				modalCloseHandler={modalCloseHandler}
			/>
			<div className='requests-container'>
				<div className='d-flex justify-content-between align-items-center mt-4 table-head ps-xxl-5 ms-xxl-4'>
					<Tabs
						text
						tabClassName='mb-4 mb-sm-0'
						className='flex-column flex-sm-row w-100'
						tabGroupName='requests-tabs'
						data={[
							{
								label: 'All',
								target: 'all',
								badgeText: '27',
								active: true,
							},
							{
								label: 'On Hold',
								target: 'on-hold',
								badgeText: '4',
							},
							{
								label: 'Requested',
								target: 'requested',
								badgeText: '4',
							},
							{
								label: 'In Progress',
								target: 'in-progress',
								badgeText: '7',
							},
							{
								label: 'Done/Approved',
								target: 'done',
								badgeText: '12',
							},
							{
								label: 'Internal',
								target: 'internal',
								badgeText: '9',
							},
						]}
					/>

					<div className='d-flex align-items-center'>
						<AddBtn onClick={modalOpenHandler} pale title='NEW' />
					</div>
				</div>

				<div className='table-container ps-sm-5 pe-sm-4 short-vertical-scrollbar mt-3'>
					<table>
						<thead>
							<tr>
								<th>
									#
									<div className='sort'>
										<img src='./assets/vectors/sort-up.svg' alt='sort' />
										<img src='./assets/vectors/sort-down.svg' alt='sort' />
									</div>
								</th>
								<th>
									Request Name
									<div className='sort'>
										<img src='./assets/vectors/sort-up.svg' alt='sort' />
										<img src='./assets/vectors/sort-down.svg' alt='sort' />
									</div>
								</th>
								<th>Leader</th>
								<th>
									Status
									<div className='info'>
										<img src='./assets/vectors/info.svg' alt='' />
									</div>
								</th>
								<th>Category</th>
								<th>
									Start &amp; Due Date
									<div className='info'>
										<img src='./assets/vectors/info.svg' alt='' />
									</div>
								</th>
								<th>Noded with</th>
							</tr>
						</thead>
						<tbody className=' br-16'>
							{requestList?.map((el, idx) => {
								const {
									name,
									LU,
									status,
									categorie,
									created_at,
									due_date,
									nodedWith,
									invoice_id,
									request_id,
									id,
								} = el;
								let statusClass = allStatus.find(
									(item) => item.id === request_id.status,
								)?.class;
								console.log(statusClass);
								return (
									<Link
										to={'/workshop-request-details/' + el?.request_id?.id}
										className='Link'
									>
										<tr
											key={'requests-item ' + idx}
											emboss-row
											className='table-hover'
										>
											<td>{idx + 129}</td>
											<td>{name}</td>
											<td>
												<img src='./assets/vectors/active-eye.svg' alt='user' />
											</td>
											<td>
												<div className={`status-badge ${statusClass}`}>
													<div className='text'>
														{/* {status === 'done' && 'Done'}
														{status === 'hold' && 'On Hold'}
														{status === 'todo' && 'To Do'}
														{status === 'progress' && 'In Progress'} */}
														{
															allStatus.find(
																(item) => item.id === request_id.status,
															)?.name
														}
													</div>
												</div>
											</td>
											<td>
												<div className={`category${categorie ? '' : ' empty'}`}>
													{categorie || (
														<img
															src='./assets/vectors/schedule-add.svg'
															alt='add'
														/>
													)}
												</div>
											</td>
											<td>
												<div className='date'>
													{inputDateFormate(created_at)}
												</div>{' '}
												<span>&gt;</span>
												<div className='date'>{inputDateFormate(due_date)}</div>
											</td>
											<td>{nodedWith}</td>
										</tr>
									</Link>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</WorkshopLayout>
	);
};

// {
//   name: "Allosaurus web app",
//   LU: "./assets/vectors/requests-user-1.svg",
//   status: "done",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "WO #342354543",
// },
// {
//   name: "MicroRaptor website",
//   LU: "./assets/vectors/requests-user-1.svg",
//   status: "done",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "WO #342354543",
// },
// {
//   name: "Tarius landing page",
//   LU: "./assets/vectors/requests-user-2.svg",
//   status: "hold",
//   categorie: undefined,
//   startDate: undefined,
//   dueDate: undefined,
//   nodedWith: "WO #342354543",
// },
// {
//   name: "Rugops App",
//   LU: "./assets/vectors/requests-user-1.svg",
//   status: "todo",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "Mathilde Dubé",
// },
// {
//   name: "Erketu",
//   LU: "./assets/vectors/requests-user-1.svg",
//   status: "todo",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "Christian Latour",
// },
// {
//   name: "Order Part Light",
//   LU: "./assets/vectors/requests-user-2.svg",
//   status: "progress",
//   categorie: "3",
//   startDate: "15 May 2021",
//   nodedWith: "WO #894578534",
// },
// {
//   name: "Gemini",
//   LU: "./assets/vectors/requests-user-3.svg",
//   status: "done",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "WO #894578534",
// },
// {
//   name: "Allosaurus web app",
//   LU: "./assets/vectors/requests-user-1.svg",
//   status: "done",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "WO #342354543",
// },
// {
//   name: "MicroRaptor website",
//   LU: "./assets/vectors/requests-user-1.svg",
//   status: "done",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "WO #342354543",
// },
// {
//   name: "Tarius landing page",
//   LU: "./assets/vectors/requests-user-2.svg",
//   status: "hold",
//   categorie: undefined,
//   startDate: undefined,
//   dueDate: undefined,
//   nodedWith: "WO #342354543",
// },
// {
//   name: "Rugops App",
//   LU: "./assets/vectors/requests-user-1.svg",
//   status: "todo",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "Mathilde Dubé",
// },
// {
//   name: "Erketu",
//   LU: "./assets/vectors/requests-user-1.svg",
//   status: "todo",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "Christian Latour",
// },
// {
//   name: "Order Part Light",
//   LU: "./assets/vectors/requests-user-2.svg",
//   status: "progress",
//   categorie: "3",
//   startDate: "15 May 2021",
//   nodedWith: "WO #894578534",
// },
// {
//   name: "Gemini",
//   LU: "./assets/vectors/requests-user-3.svg",
//   status: "done",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "WO #894578534",
// },
// {
//   name: "Rugops App",
//   LU: "./assets/vectors/requests-user-1.svg",
//   status: "todo",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "Mathilde Dubé",
// },
// {
//   name: "Erketu",
//   LU: "./assets/vectors/requests-user-1.svg",
//   status: "todo",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "Christian Latour",
// },
// {
//   name: "Order Part Light",
//   LU: "./assets/vectors/requests-user-2.svg",
//   status: "progress",
//   categorie: "3",
//   startDate: "15 May 2021",
//   nodedWith: "WO #894578534",
// },
// {
//   name: "Gemini",
//   LU: "./assets/vectors/requests-user-3.svg",
//   status: "done",
//   categorie: "3",
//   startDate: "15 May 2021",
//   dueDate: "15 May 2021",
//   nodedWith: "WO #894578534",
// },

export default WorkshopRequests;
