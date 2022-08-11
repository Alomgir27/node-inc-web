import React, { useCallback, useEffect, useState, useContext } from 'react';

import FancyInput from '../components/FancyInput';
import AddBtn from '../components/AddBtn';
import Input from '../components/Input';
import TabContents from '../components/TabContents';
import TabContentItem from '../components/TabContentItem';
import WorkshopWorkorderLayout from '../layouts/WorkshopWorkorderLayout';
import ModalOrder from '../modals/Modalrequests';
import ModalForm from '../modals/ModalForm';
import ModalArticle from '../modals/ModalServices';
import Accordion from '../components/Accordion';
import Switch from '../components/Switch';
import { Link, useNavigate } from 'react-router-dom';
import nodeAxios from '../utils/nodeAxios';
import ModalMaintanance from '../modals/ModalMaintanance';
import { BASEURL, sendNetworkRequest } from '../http/http-request';
import { AuthContext } from '../store/auth-context';

const WorkshopArticles = (props) => {
	const [curPage, setCurPage] = useState(0);
	const [ProfileId, setProfileId] = useState('');
	const { tokens } = useContext(AuthContext);
	const [maintananceData, setMaintananceData] = useState([]);

	/* Getting Token Id from local storage */
	const invoice_id = window.localStorage.getItem('invoiceId');
	/* All state that are used in this file */
	const [type, setType] = useState(null);
	const [noteData, setNoteData] = useState('');
	const [requests, setRequests] = useState([]);
	const [orderModalOpenState, setOrderModalOpenState] = useState(false);
	const [FormModalOpenState, setFormModalOpenState] = useState(false);
	const [articleModalOpenState, setArticleModalOpenState] = useState(false);
	const [invoiceFile, setInvoiceFile] = useState(null);
	const [odometer, setOdometer] = useState(0);
	const [selectedServiceId, setSelectedServiceId] = useState(null);
	const [subTotal, setSubTotal] = useState(0);
	const navigate = useNavigate();
	const [completedArr, setCompletedArr] = useState([]);
	const [landmarks, setLandmarks] = useState([]);
	const [flag, setFlag] = useState(true);
	const [maintananceModalOpenState, setMaintananceModalOpenState] =
		useState(false);

	const [services, setServices] = useState([]);
	const [active, setActive] = useState('maintenance');

	const [formState, setFormState] = useState({
		name1: 'Front Pad',
		sku1: '873244424343-32',
		quantity1: 2,
		availability1: 76,
		unitPrice1: '20.00$',
		categorie1: 'BRAKE',
		name2: 'Front Brake Change with OP',
		sku2: 'L-FBC-OP',
		quantity2: 1,
		availability2: 'NA',
		unitPrice2: '47.00$',
		categorie2: 'LABOR',
		details: 'Part of brake article description here.',
		discount: '0%',
	});

	const fetchRequest = useCallback(async () => {
		const response = await nodeAxios('GET', `request/invoice/${invoice_id}/0`);
		console.log('fetchRequest response : ', response);
		setRequests(response.requests);
	}, [invoice_id]);

	useEffect(() => {
		fetchRequest();
	}, [fetchRequest]);

	useEffect(() => {
		setProfileId(localStorage.getItem('profile_id'));
		GetMaintananceRecordAPI();
	}, []);

	async function GetMaintananceRecordAPI() {
		const api = await fetch(
			`${BASEURL}/forecast/all/profile/${localStorage.getItem(
				'profile_id',
			)}/${curPage}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
			},
		);
		const resp = await api.json();
		console.log(resp);
		setMaintananceData(resp);
	}

	const inputChangeHandler = () => {};

	/* Modal open close  */
	const modalOpenHandler = (func) => {
		func(true);
	};

	const modalCloseHandler = (func) => {
		func(false);
	};

	/* Odometer Timer */
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);
	useEffect(() => {
		let interval;
		if (running) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 10);
			}, 10);
		} else if (!running) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [running]);
	/* For handling file upload */
	const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		setInvoiceFile(URL.createObjectURL(file));

		/*=== Invoice file api connection code will be added soon === */
		const formData = new FormData();
		formData.append('file', e.target.files[0]);
		formData.append('invoice_id', invoice_id);
		formData.append('metadata', JSON.stringify({}));
		formData.append('action_metadata', JSON.stringify({}));

		await nodeAxios('POST', 'invoice/file', formData);
	};

	/* Get the uploaded file & set into React state */
	useEffect(() => {
		(async () => {
			const file = await nodeAxios('GET', `invoice/file/${invoice_id}`);
			setInvoiceFile(file?.url.split('?')[0]);
		})();
	}, [invoice_id]);
	const calculateArticlePrice = (clonedServices) => {
		const articles = [];
		clonedServices.forEach((service) => {
			service.service_id.articles.forEach((article) => {
				articles.push(article);
			});
		});
		const total = articles
			.map((el) => el.base_price * (el.metadata?.quantity || 1))
			.reduce((a, b) => a + b, 0);
		return total;
	};
	/* From Change Handler */
	const formChangeHandler = async (
		event,
		outerIndex,
		innerIndex,
		isUnderMetadata,
	) => {
		const clonedServices = [...services];
		const { name, value } = event.target;
		if (isUnderMetadata) {
			clonedServices[outerIndex].service_id.articles[innerIndex].metadata[
				name
			] = value;
		} else {
			clonedServices[outerIndex].service_id.articles[innerIndex][name] = value;
		}

		setServices(clonedServices);
		setSubTotal(calculateArticlePrice(clonedServices));
	};
	/* When user focus out from the input element then it will save to database */
	const formBlurHandler = async (outerIndex, innerIndex, item_id) => {
		const updatedValue = {
			description:
				services[outerIndex].service_id.articles[innerIndex].description,
			base_price:
				services[outerIndex].service_id.articles[innerIndex].base_price,
			metadata: {
				quantity:
					services[outerIndex].service_id.articles[innerIndex].metadata
						.quantity,
				discount:
					services[outerIndex].service_id.articles[innerIndex].metadata
						.discount,
			},
		};
		await nodeAxios(
			'PATCH',
			`invoice/item/${invoice_id}/${item_id}`,
			updatedValue,
		);
	};
	/* ===Articles Summary === */
	const loadSummary = useCallback(async () => {
		const services = await nodeAxios('GET', `invoice/service/${invoice_id}`);
		const { items: articles } = await nodeAxios(
			'GET',
			`invoice/items/${invoice_id}`,
		);

		services.forEach((service) => {
			service.service_id.articles = articles.filter((article) => {
				return article.metadata.service_id === service.id;
			});
		});
		setServices(services);
		setSubTotal(calculateArticlePrice(services));
	}, [invoice_id]);

	useEffect(() => {
		loadSummary();
	}, [loadSummary]);

	/* Update Invoice */
	const handleInvoiceUpdate = async () => {
		await nodeAxios('PATCH', `invoice/${invoice_id}`, {
			metadata: { status: 2 },
		});
		navigate('/workshop-realtime');
	};
	/* Calculate percentage of work completed */
	const handleCheckboxChange = async (event, item_id, index) => {
		const clonedServices = [...services];
		const { checked } = event.target;
		if (checked) {
			clonedServices[index].service_id.completed = true;
		} else {
			clonedServices[index].service_id.completed = false;
		}
		setServices(clonedServices);
		setCompletedArr(clonedServices.filter((el) => el.service_id.completed));

		/*  await nodeAxios("PATCH", `invoice/item/${invoice_id}/${item_id}`, {
      metadata: { completed: event.target.checked },
    });
    loadSummary(); */
	};

	const handelActive = (e) => {
		setActive(e.target.id);
	};

	const handleInvoiceDelete = async (item_id) => {
		await nodeAxios('DELETE', `invoice/items/${item_id}`);
		loadSummary();
	};
	const handleProfileTimerUpdate = async () => {
		setRunning(false);
		await nodeAxios('PATCH', `invoice/${invoice_id}`, {
			metadata: { timer: time },
		});
	};
	const handleOdometerBlur = async (event) => {
		const profile_id = localStorage.getItem('profile_id');
		await nodeAxios('PATCH', `profile/${profile_id}`, {
			data: { odometer: event.target.value },
		});
	};

	const handleNotesChange = async (event) => {
		const { value } = event.target;
		await nodeAxios('POST', 'core/notes', { data: value });
	};

	// console.clear();
	return (
		<WorkshopWorkorderLayout
			title='Details'
			invoice_id={invoice_id}
			summary={{ services, subTotal }}
			percentage={(completedArr.length / (services.length || 2)) * 100}
			setOdometer={setOdometer}
			setTime={setTime}
			setLandmarks={setLandmarks}
		>
			<ModalOrder
				isOpen={orderModalOpenState}
				modalCloseHandler={() => modalCloseHandler(setOrderModalOpenState)}
			/>
			<ModalForm
				isOpen={FormModalOpenState}
				modalCloseHandler={() => modalCloseHandler(setFormModalOpenState)}
			/>
			<ModalArticle
				invoice_id={invoice_id}
				isOpen={articleModalOpenState}
				modalCloseHandler={() => modalCloseHandler(setArticleModalOpenState)}
				loadSummary={loadSummary}
				type={type}
				selectedServiceId={selectedServiceId}
			/>

			<ModalMaintanance
				isOpen={maintananceModalOpenState}
				modalCloseHandler={() =>
					modalCloseHandler(setMaintananceModalOpenState)
				}
			/>

			<TabContents tabGroupName='workshop-articles-tabs'>
				<TabContentItem target='forms'>
					<div className='container-fluid px-0 mt-4'>
						<div className='row gy-5'>
							<div className='col-md-6'>
								<div className='d-flex flex-wrap justify-content-between title-container px-3'>
									<div className='title me-4 pb-3'>
										<h3 className='section-title text-dark-1 d-flex align-items-center'>
											<img
												className='me-3'
												src='./assets/vectors/forms.svg'
												alt='forms'
											/>
											Forms
										</h3>
									</div>
								</div>
								<div className='files forms emboss-white br-16'>
									<div className='file-item'>
										<div className='bg'>
											<img src='./assets/vectors/!.svg' alt='exclamation' />
										</div>
										<div className='text'>Inspection</div>
									</div>
									<div className='file-item'>
										<div className='bg'>
											<img src='./assets/vectors/tick.svg' alt='exclamation' />
										</div>
										<div className='text'>Brake Check</div>
									</div>
								</div>
							</div>
							<div className='col-md-6'>
								<div className='d-flex flex-wrap justify-content-between title-container px-3'>
									<div className='title me-4 pb-3'>
										<h3 className='section-title text-dark-1 d-flex align-items-center'>
											<img
												className='me-3'
												src='./assets/vectors/live.svg'
												alt='files'
											/>
											Feeds
										</h3>
									</div>
									<input type='file' onChange={handleFileUpload} />
									<AddBtn pale />
								</div>

								<div className='files img emboss-white br-16'>
									{invoiceFile ? (
										<div className='file-item'>
											<img src={invoiceFile} alt='exclamation' />
											<div className='text'>Feed Image</div>
										</div>
									) : (
										<p>No data found! 🙄</p>
									)}
									{/* <div className="file-item">
                    <img
                      src="./assets/vectors/file-img-placeholder.svg"
                      alt="exclamation"
                    />
                    <div className="text">Rear Scratch</div>
                  </div>
                  <div className="file-item">
                    <img
                      src="./assets/vectors/file-img-placeholder.svg"
                      alt="exclamation"
                    />
                    <div className="text">Brake Check</div>
                  </div>
                  <div className="file-item">
                    <img
                      src="./assets/vectors/file-img-placeholder.svg"
                      alt="exclamation"
                    />
                    <div className="text">Door lock</div>
                  </div> */}
								</div>
							</div>
						</div>
					</div>

					<div className='d-flex justify-content-between mt-5'>
						<div className='title d-flex justify-content-between w-100'>
							<h3 className='section-title text-dark-1 d-flex align-items-center'>
								<img
									className='me-3'
									src='./assets/vectors/requests-dark.svg'
									alt='requests'
								/>
								Requests
							</h3>
						</div>
					</div>

					<div className='mt-3 br-16 emboss-white px-3 py-4'>
						<div className='table-container vertical-scrollbar'>
							<table style={{ minWidth: 500 }}>
								{requests?.map((request) => (
									<tr key={request?.request_id?.id}>
										<Link
											to={`/workshop-request-details/${request?.request_id?.id}`}
											className='w-100 d-flex justify-content-between'
										>
											<td>{request?.name}</td>

											<td>
												<div className='d-flex align-items-center'>
													{request?.is_completed ? (
														<React.Fragment>
															<div
																className='round-box me-2'
																style={{ backgroundColor: '#7E8876' }}
															></div>
															<span className='text-bluea'>Completed</span>
														</React.Fragment>
													) : (
														<React.Fragment>
															<div
																className='round-box me-2'
																style={{ backgroundColor: '#1E55A9' }}
															></div>
															<span className='text-bluem'>
																Open/In progress
															</span>
														</React.Fragment>
													)}
												</div>
											</td>
											<td>{request?.invoice_id?.metadata?.assign}</td>
											<td>
												{new Intl.DateTimeFormat('en-UK', {
													day: 'numeric',
													month: 'short',
													year: 'numeric',
												}).format(
													new Date(
														request?.invoice_id?.metadata?.sdate || Date.now(),
													),
												)}
											</td>
										</Link>
									</tr>
								))}
							</table>
						</div>
					</div>

					<div className='d-flex justify-content-between title-container mt-5'>
						<div
							id='maintenance'
							className={`py-3 px-2 hover title d-flex justify-content-between w-100`}
							onClick={handelActive}
						>
							<h3
								className='section-title text-dark-1 d-flex align-items-center'
								style={{ border: '2px solid red' }}
							>
								<img
									className='me-3'
									src='./assets/vectors/darkeye.svg'
									alt='requests'
									width='20px'
								/>
								Maintenance
							</h3>
						</div>
					</div>

					{active == 'maintenance' ? (
						<div className='mt-3 br-16 emboss-white px-3 py-4'>
							<div className='table-container vertical-scrollbar'>
								<table style={{ minWidth: 500 }}>
									<tr>
										{maintananceData?.map((rec) => {
											let recdate = new Date(rec.reco_date).getDate();
											let recmon = new Date(rec.reco_date).getMonth();
											let recyear = new Date(rec.reco_date).getFullYear();
											let MainTags = rec.tags;
											let FormatTags = JSON.parse(MainTags[0]).label;
											return (
												<Link
													to=''
													className='w-100 d-flex justify-content-between'
												>
													<td>
														<div className='d-flex'>{rec.name}</div>
													</td>

													<td>
														<div className='d-flex'>{FormatTags}, </div>
													</td>
													<td>
														<div className='d-flex'>
															{`${recyear}/${recmon}/${recdate}`}
														</div>
													</td>
												</Link>
											);
										})}
									</tr>
								</table>
							</div>
						</div>
					) : (
						''
					)}

					<div className='d-flex justify-content-between title-container mt-5'>
						<div className='title'>
							<h3 className='section-title text-dark-1 d-flex align-items-center'>
								<img
									className='me-3'
									src='./assets/vectors/notes.svg'
									alt='notes'
								/>
								Notes
							</h3>
						</div>
					</div>

					<div className='mt-3 br-16 emboss-white px-3 py-4'>
						<div className='fs-10 text-manrope text-light-7'>Internal Note</div>
						<Input
							rootClassName='mt-2'
							value={noteData}
							onChange={(e) => setNoteData(e.target.value)}
							placeholder='Write a note! (Optional) 😎'
							onBlur={handleNotesChange}
							textArea
							rows={3}
						/>
						{/* <div className="mt-4 fs-10 text-manrope text-light-7">
              Public Note
            </div>
            <Input
              rootClassName="mt-2"
              value="Is there any evidence of benefit if people without diabetes monitor their blood sugar levels with CGMs? There’s little published research to help answer this question."
              textArea
              rows={4}
            /> */}

						{/* <div className="d-flex justify-content-end mt-5">
              <button className="btn btn-blue btn-rounded">
                Convert to Invoice
                <img
                  className="ms-3"
                  src="./assets/vectors/r-arrow-btn.svg"
                  alt="right-arrow"
                />
              </button>
            </div> */}
					</div>
				</TabContentItem>

				<TabContentItem target='articles'>
					<div className='d-flex justify-content-end mt-4 mb-3'>
						<AddBtn
							onClick={() => {
								setType('services');
								modalOpenHandler(setArticleModalOpenState);
							}}
							pale
						/>
					</div>
					<div className='collapses-container'>
						<div className='collapse '>
							{services.map((service, outerIndex) => {
								return (
									<div key={outerIndex} className='d-flex align-items-baseline'>
										<input
											type='checkbox'
											onChange={(e) =>
												handleCheckboxChange(e, service.id, outerIndex)
											}
											checked={service.service_id.completed}
										/>
										<div className='col-sm-1'>
											<FancyInput
												placeholder='h'
												name='hours'
												className='custom-select'
												value={service.service_id.price}
											/>
										</div>
										<Accordion
											headComp={
												<div className='head'>
													<div className='text-dark-3 text-lato fw-800 fs-12 d-flex align-items-center'>
														{service.service_id.name}
													</div>

													<div className='options w-25'>
														<div className='btn p-0 w-100 d-flex justify-content-between'>
															<img
																src='./assets/vectors/add.svg'
																alt='bin'
																onClick={() => {
																	setSelectedServiceId(service.id);
																	setType('articles');
																	modalOpenHandler(setArticleModalOpenState);
																}}
															/>
															<img
																src='./assets/vectors/darkeye.svg'
																alt='bin'
																height='17px'
																onClick={() =>
																	modalOpenHandler(setMaintananceModalOpenState)
																}
															/>
															<img
																src='./assets/vectors/bin-1.svg'
																alt='bin'
																onClick={() => handleInvoiceDelete(service.id)}
															/>
														</div>
														<div className='btn p-0'>
															<img
																className='arrow'
																src='./assets/vectors/arrow-down-1.svg'
																alt='arrow-down'
															/>
														</div>
													</div>
												</div>
											}
										>
											<div className='body'>
												{service.service_id.articles?.map(
													(article, innerIndex) => (
														<div className='collapse-section'>
															<div className='container-fluid px-0'>
																<div className='row'>
																	<div className='col-6'>
																		<FancyInput
																			embossed={false}
																			icon='vectors/cart.svg'
																			prominantBlue
																			mdPaddingBottom
																			sMargin
																			label='&nbsp;'
																			id='name'
																			name='name'
																			placeholder='Start typing...'
																			value={article.metadata.name}
																		/>
																	</div>
																	<div className='col-6'>
																		<FancyInput
																			embossed={false}
																			prominant
																			lightLabel
																			thinlabel
																			mdPaddingBottom
																			sMargin
																			id='sku'
																			name='sku'
																			label='SKU'
																			placeholder='Start typing...'
																			value={article.metadata.sku}
																		/>
																	</div>
																	<div className='col-6 col-sm-3'>
																		<FancyInput
																			embossed={false}
																			prominant
																			lightLabel
																			thinlabel
																			mdPaddingBottom
																			sMargin
																			id='quantity'
																			name='quantity'
																			label='Quantity'
																			placeholder='Start typing...'
																			onChange={(e) =>
																				formChangeHandler(
																					e,
																					outerIndex,
																					innerIndex,
																					true,
																				)
																			}
																			onBlur={() =>
																				formBlurHandler(
																					outerIndex,
																					innerIndex,
																					article.id,
																				)
																			}
																			value={article.metadata.quantity || 1}
																		/>
																	</div>
																	<div className='col-6 col-sm-3'>
																		<FancyInput
																			embossed={false}
																			prominant
																			lightLabel
																			thinlabel
																			mdPaddingBottom
																			sMargin
																			id='availability'
																			name='availability'
																			label='Availability'
																			placeholder='Start typing...'
																			disabled
																			value={article.metadata.availability || 0}
																		/>
																	</div>
																	<div className='col-6 col-sm-3'>
																		<FancyInput
																			embossed={false}
																			prominant
																			lightLabel
																			thinlabel
																			mdPaddingBottom
																			sMargin
																			id='base_price'
																			name='base_price'
																			label='Unit Price'
																			placeholder='Start typing...'
																			value={article.base_price}
																			onChange={(e) =>
																				formChangeHandler(
																					e,
																					outerIndex,
																					innerIndex,
																					false,
																				)
																			}
																			onBlur={() =>
																				formBlurHandler(
																					outerIndex,
																					innerIndex,
																					article.id,
																				)
																			}
																		/>
																	</div>
																	<div className='col-6 col-sm-3'>
																		<FancyInput
																			embossed={false}
																			prominant
																			lightLabel
																			thinlabel
																			mdPaddingBottom
																			sMargin
																			id='category'
																			name='category'
																			label='Variant'
																			placeholder='Start typing...'
																			value={article.category}
																		/>
																	</div>
																</div>
																<div className='row'>
																	<div className='col-8'>
																		<FancyInput
																			embossed={false}
																			prominant
																			lightLabel
																			thinlabel
																			mdPaddingBottom
																			sMargin
																			id='description'
																			name='description'
																			label='Details'
																			placeholder='Start typing...'
																			onChange={(e) =>
																				formChangeHandler(
																					e,
																					outerIndex,
																					innerIndex,
																					false,
																				)
																			}
																			onBlur={() =>
																				formBlurHandler(
																					outerIndex,
																					innerIndex,
																					article.id,
																				)
																			}
																			value={article.description}
																		/>
																	</div>
																	<div className='col-4'>
																		<FancyInput
																			embossed={false}
																			prominant
																			lightLabel
																			thinlabel
																			mdPaddingBottom
																			sMargin
																			id='discount'
																			name='discount'
																			label='Discount'
																			placeholder='Start typing...'
																			onChange={(e) =>
																				formChangeHandler(
																					e,
																					outerIndex,
																					innerIndex,
																					true,
																				)
																			}
																			onBlur={() =>
																				formBlurHandler(
																					outerIndex,
																					innerIndex,
																					article.id,
																				)
																			}
																			value={article.metadata.discount || 0}
																		/>
																	</div>
																</div>
															</div>
														</div>
													),
												)}
											</div>
										</Accordion>
									</div>
								);
							})}
							{/* <Accordion
              
                headComp={
                  <div className="head">
                    <div className="text-dark-3 text-lato fw-800 fs-12">
                      Service: Front Back Change
                    </div>
                    <div className="options w-25">
                      <div className="btn p-0 w-100 d-flex justify-content-between">
                        <img src="./assets/vectors/add.svg" alt="bin" />
                        <img
                          src="./assets/vectors/darkeye.svg"
                          alt="bin"
                          height="17px"
                        />
                        <img src="./assets/vectors/bin-1.svg" alt="bin" />
                      </div>
                      <div className="btn p-0">
                        <img
                          className="arrow"
                          src="./assets/vectors/arrow-down-1.svg"
                          alt="arrow-down"
                        />
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="body">
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="name1"
                            name="name1"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.name1}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku1"
                            name="sku1"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity1"
                            name="quantity1"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability1"
                            name="availability1"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice1"
                            name="unitPrice1"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie1"
                            name="categorie1"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie1}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="categorie2"
                            name="categorie2"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku2"
                            name="sku2"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability2"
                            name="availability2"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice2"
                            name="unitPrice2"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie2"
                            name="categorie2"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion> */}
						</div>
						{/* <div className="collapse">
              <Accordion
                headComp={
                  <div className="head">
                    <div className="text-dark-3 text-lato fw-800 fs-12">
                      Unit : Oil - (1L) 5W30 Syn.
                    </div>
                    <div className="options w-25">
                      <div className="btn p-0 w-100 d-flex justify-content-between">
                        <img src="./assets/vectors/add.svg" alt="bin" />
                        <img
                          src="./assets/vectors/darkeye.svg"
                          alt="bin"
                          height="17px"
                        />
                        <img src="./assets/vectors/bin-1.svg" alt="bin" />
                      </div>
                      <div className="btn p-0">
                        <img
                          className="arrow"
                          src="./assets/vectors/arrow-down-1.svg"
                          alt="arrow-down"
                        />
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="body">
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="name1"
                            name="name1"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.name1}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku1"
                            name="sku1"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity1"
                            name="quantity1"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability1"
                            name="availability1"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice1"
                            name="unitPrice1"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie1"
                            name="categorie1"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie1}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="categorie2"
                            name="categorie2"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku2"
                            name="sku2"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability2"
                            name="availability2"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice2"
                            name="unitPrice2"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie2"
                            name="categorie2"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>
            <div className="collapse">
              <Accordion
                headComp={
                  <div className="head">
                    <div className="text-dark-3 text-lato fw-800 fs-12">
                      Unit : 7C Battery
                    </div>
                    <div className="options w-25">
                      <div className="btn p-0 w-100 d-flex justify-content-between">
                        <img src="./assets/vectors/add.svg" alt="bin" />
                        <img
                          src="./assets/vectors/darkeye.svg"
                          alt="bin"
                          height="17px"
                        />
                        <img src="./assets/vectors/bin-1.svg" alt="bin" />
                      </div>
                      <div className="btn p-0">
                        <img
                          className="arrow"
                          src="./assets/vectors/arrow-down-1.svg"
                          alt="arrow-down"
                        />
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="body">
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="name1"
                            name="name1"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.name1}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku1"
                            name="sku1"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity1"
                            name="quantity1"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability1"
                            name="availability1"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice1"
                            name="unitPrice1"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie1"
                            name="categorie1"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie1}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="categorie2"
                            name="categorie2"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku2"
                            name="sku2"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability2"
                            name="availability2"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice2"
                            name="unitPrice2"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie2"
                            name="categorie2"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div> */}
						{/* <div className="collapse closed">
              <div className="head">
                <div className="text">Service : Front Brake Change</div>
                <div className="options">
                  <div className="btn p-0">
                    <img src="./assets/vectors/bin-1.svg" alt="bin" />
                  </div>
                  <div className="btn p-0">
                    <img
                      src="./assets/vectors/arrow-down-1.svg"
                      alt="arrow-down"
                    />
                  </div>
                </div>
              </div>
            </div><div className="collapse closed">
              <div className="head">
                <div className="text">Service : Front Brake Change</div>
                <div className="options">
                  <div className="btn p-0">
                    <img src="./assets/vectors/bin-1.svg" alt="bin" />
                  </div>
                  <div className="btn p-0">
                    <img
                      src="./assets/vectors/arrow-down-1.svg"
                      alt="arrow-down"
                    />
                  </div>
                </div>
              </div>
            </div> */}
					</div>

					<div className='d-flex justify-content-end mt-4 mb-3'>
						<button
							className='btn text-white btn-gradient'
							onClick={handleInvoiceUpdate}
						>
							Done, Close card
							<img
								className='ms-3'
								src='./assets/vectors/r-arrow-btn.svg'
								alt='right-arrow'
							/>
						</button>
					</div>
				</TabContentItem>

				<TabContentItem target='partners'>
					<h3 className='section-title'>Partners</h3>

					<div className='continer-fluid px-0 mt-4'>
						<div className='row g-4'>
							{[
								{ img: './assets/img/partner-1.png', maxWidth: 79 },
								{ img: './assets/img/partner-2.png', maxWidth: 153 },
								{ img: './assets/img/partner-3.png', maxWidth: 100 },
								{ img: './assets/img/partner-4.png', maxWidth: 190 },
								{ img: './assets/img/partner-5.png', maxWidth: 120 },
							].map((el, idx) => {
								const { img, maxWidth } = el;

								return (
									<div
										key={'partner' + idx}
										className='col-md-4 col-sm-6 col-12'
									>
										<div className='br-16 h-100 d-flex justify-content-center align-items-center p-5 py-4 emboss-white'>
											<img
												className='w-100'
												src={img}
												alt='partner'
												style={{ maxWidth }}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</TabContentItem>

				<TabContentItem target='brakeService'>
					<div className='odometer d-flex justify-content-between mb-5'>
						<div className='meter d-flex justify-content-between align-items-center'>
							<p>Odometer</p>
							<div className='odo-input d-flex justify-content-between'>
								<input
									type='text'
									placeholder='78 098'
									value={odometer}
									onChange={(e) => setOdometer(e.target.value)}
									onBlur={handleOdometerBlur}
								/>
								<span>KM</span>
							</div>
						</div>
						<div className='meter d-flex justify-content-around align-items-center'>
							<img
								src='./assets/vectors/play.svg'
								onClick={() => setRunning(true)}
								className='odo-btn'
								alt='vector'
							/>

							<img
								src='./assets/vectors/pause .png'
								onClick={handleProfileTimerUpdate}
								width='18px'
								height='18px'
								className='odo-btn'
								alt='vector'
							/>
							<img
								src='./assets/vectors/reload.png'
								onClick={() => setTime(0)}
								width='20px'
								height='20px'
								className='odo-btn'
								alt='vector'
							/>
							<div className='odo-input d-flex justify-content-between'>
								<input type='text' />
								<span>
									<div className='numbers'>
										<span>
											{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
										</span>
										<span>
											{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:
										</span>
										<span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
									</div>
								</span>
							</div>
						</div>
					</div>
					<h3 className='section-title'>Brake Services</h3>

					<div className='mt-3 br-16 emboss-white px-3 py-4'>
						<div className='fs-10 text-manrope text-light-7'>Client Note</div>
						<Input
							rootClassName='mt-2'
							value='The best study I could find found nothing particularly Another small study looked at sedentary individuals without diabetes who were overweight or obese.'
							textArea
							rows={3}
						/>
						<div className='mt-4 mb-3 fs-10 text-manrope text-light-7'>
							Picture of Brake
						</div>
						<div className='file-uploader'>
							<label htmlFor='file-upload'></label>
							<input type='file' name='' id='file-upload' />

							<div className='text-center text'>
								<div className='d-flex align-items-center justify-content-center'>
									<img
										src='./assets/vectors/clip.svg'
										className='me-3'
										alt='clip'
									/>
									<div className='text-inter fw-600'>Add your file here</div>
								</div>
								<div className='text-light-6 text-inter mt-1'>
									Max size 10MB
								</div>
							</div>
						</div>
					</div>

					<h3 className='section-title mt-5 mb-2'>Inspection</h3>
					<div className='mt-3 br-16 emboss-white px-3 py-4'>
						<div className='fs-10 text-manrope text-light-7'>Next Due Date</div>
						<Input
							// withToggler
							// label="Next Due date"
							// type="date"
							id='date'
							name='date'
							onChange={inputChangeHandler}
							placeholder='22/02/2021'
							value={formState.date}
							icon='vectors/calender-2.svg'
						/>

						<div className='fs-10 text-manrope text-light-7 mb-2'>
							Exterior is good?
						</div>
						<div className='d-flex px-2'>
							<Switch className='ml-3' />
							<div className='fs-10 text-manrope  mb-2 mx-3'>yes</div>
						</div>
					</div>
				</TabContentItem>
			</TabContents>
		</WorkshopWorkorderLayout>
	);
};

export default WorkshopArticles;
