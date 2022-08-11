import React, { useState, useEffect } from 'react';

import Modal from './Modal';
// import AddBtn from "../components/AddBtn";
import FancyInput from '../components/FancyInput';
import ModalNewVarient from './ModalNewVarient';
import { BASEURL } from '../http/http-request';
import axios from 'axios';

const ModalArticle = (props) => {
	const [variantModalOpenState, setVariantModalOpenState] = useState();
	const [Categories, setCategories] = useState([]);
	const [uploadFile, setUploadFile] = useState();
	const [checked, setChecked] = useState(false);
	const modalOpenHandler = (func) => {
		func(true);
	};

	const modalCloseHandler = (func) => {
		func(false);
	};
	const [article, setArticle] = useState({});

	const inputChangeHandler = (e) => {
		let { name, value } = e.target;
		console.log(name, value);
		setArticle({
			...article,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		const data = {
			name: article.name,
			sku: article.sku,
			price: article.price,
			dims: article.dims,
			warranty: article.warranty,
			cost: article.cost,
			quantity: article.quantity,
		};

		try {
			const tokens = JSON.parse(localStorage.getItem('tokens'));

			const me = await axios({
				url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/me`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
			});

			const res = await axios({
				url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/profile`,
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
				method: 'POST',
				data: {
					data: data,
					xQuantity: parseInt(article.quantity),
					action_metadata: {},
					certification_status: 0,
					object_model_revision_id: null,
					parent_object_id: null,
					category: article.category,
					is_article: true,
					// is_generic : checked,
				},
			});

			console.log(res.data);

			const userWallet = await axios({
				url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/user/me/wallet`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
			});

			console.log(userWallet.data.wallet.id);

			const owner = await axios({
				url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/profile/owner`,
				method: 'POST',
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
				data: {
					action_metadata: { test: 'test' },
					object_id: res.data.ids[0].id,
					is_active: true,
					is_full_owner: true,
					digital_wallet_id: userWallet.data.wallet.id,
					user_id: me.data.user.id,
				},
			});

			console.log(owner.data);

			props.setArticles((arts) => [{ ...owner.data }, ...arts]);

			let obj = {
				file: document.getElementById('img').files[0],
				action_metadata: {},
				metadata: {},
				article_id: '9137ea1e-2c68-4357-884c-7ff5a2f390b2',
			};
			console.log(obj);
			const attachmentUpload = await axios({
				url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/article/attachments`,
				method: 'POST',
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
				data: obj,
			});

			console.log(attachmentUpload);
		} catch (err) {
			console.log(err.response.data);
		}
	};

	const updateArticle = () => {
		const tokens = JSON.parse(localStorage.getItem('tokens'));

		 

		// delete updatedObject.id;
		// delete updatedObject.is_subprofile;
		// delete updatedObject.sku;

		// console.log(updatedObject, "HEHHEHEHEH");

		fetch(
			`https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/profile/${props.article.object_id.id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokens.accessToken}`,
					refresh_token: tokens.refreshToken,
					idToken: tokens.idToken,
				},
				data: {
					data: JSON.stringify({
						name: article?.name,
						sku: article?.sku,
						price: article?.price,
						dims: article?.dims,
						warranty: article?.warranty,
						cost: article?.cost,
						quantity: article?.quantity,
					}),
					type: 'me',
					// is_generic : checked,
					category: article.category,
					certification_status : 0,
				},
			},
		)
			.then((res) => {
				console.log(res);
				props.fetchArticles();
			})
			.catch((err) => {
				console.error(err);
			});

		// let file = {
		// 	file: uploadFile,
		// 	action_metadata: {},
		// 	metadata: {},
		// 	article_id: props.article.object_id.id,
		// };
		// fetch(
		// 	`https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/article/attachments/${props.article.object_id.id}/attachmentId`,
		// 	{
		// 		method: 'PATCH',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: `Bearer ${tokens.accessToken}`,
		// 			refresh_token: tokens.refreshToken,
		// 			idToken: tokens.idToken,
		// 		},
		// 		body: JSON.stringify(updatedObject),
		// 	},
		// )
		// 	.then((response) => {
		// 		console.log(response);
		// 		props.fetchArticles();
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
	};

	const setInputValues = (article) => {
		let data = JSON.parse(article.object_id.data);
		console.log(data);
		setArticle({
			name: data.name,
			sku: data.sku,
			price: data.price,
			dims: data.dims,
			warranty: data.warranty,
			cost: data.cost,
			quantity: data.quantity,
			category: article.object_id.category,
		});
	};

	const clearInputs = () => {
		setArticle({
			name: '',
			sku: '',
			price: '',
			dims: '',
			warranty: '',
			cost: '',
			quantity: '',
			category: '',
		});
	};

	const getCategories = (page) => {
		const tokens = JSON.parse(localStorage.getItem('tokens'));
		fetch(
			`https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/core/category/${page}`,
			{
				method: 'get',
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
				setCategories(data.categories);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		getCategories(0);
		console.log(props?.article);
		setChecked(props?.article?.object_id?.is_generic)
		if (props.article != undefined) {
			setInputValues(props?.article);
		} else {
			clearInputs();
		}
	}, [props]);

	const checkSubmit = (e) => {
		if (props.article == undefined) {
			// Create new
			handleSubmit(e);
		} else {
			// Update
			updateArticle();
		}
	};

	return (
		<div>
			<ModalNewVarient
				isOpen={variantModalOpenState}
				modalCloseHandler={() => modalCloseHandler(setVariantModalOpenState)}
			/>
			<Modal
				className='article-modal'
				titleVector='./assets/vectors/modal-article.svg'
				title='Article'
				buttonText='SAVE'
				addArticle={checkSubmit}
				{...props}
			>
				<div>
					<div className='article-modal-body'>
						<div className='row'>
							<div className='col-7'>
								<p className='mt-2'>Article's name</p>
								<FancyInput
									sMargin
									prominant
									id='articleName'
									name='name'
									placeholder='Start typing...'
									onChange={inputChangeHandler}
									value={article.name}
								/>
							</div>
							<div className='col-2'>
								<p className='mt-2'>Variants</p>
								<div
									onClick={() => modalOpenHandler(setVariantModalOpenState)}
									className=' emboss-inner rounded c-pointer d-flex justify-content-center align-items-center fs-16 text-manrope fw-600 box py-3'
								>
									+
								</div>
							</div>
							<div className='col-3 d-flex align-items-center'>
								<label class='checkbox-container-5'>
									Is Generic
									<input type='checkbox' name='availableToBook' checked={checked} onChange={() => setChecked(!checked)}/>
									<span class='checkmark'></span>
								</label>
							</div>
						</div>

						<div className='container-fluid px-0'>
							<div className='row'>
								{!checked && (
								 <div className='col-sm-6'>
									<p className='mt-2'>SKU</p>
									<FancyInput
										sMargin
										prominant
										id='sku'
										name='sku'
										value={article.sku}
										placeholder='Start typing...'
										onChange={inputChangeHandler}
									/>
							    	</div>
								)}
								{!checked && (
									<div className='col-sm-6'>
									 <p className='mt-2'> Available quantity</p>
									<FancyInput
										sMargin
										prominant
										id='availQuan'
										name='quantity'
										value={article.quantity}
										placeholder='Start typing...'
										onChange={inputChangeHandler}
									/>
							    	</div>
								)}
								<div className='col-sm-6'>
									<p className='mt-2'>Detail Price</p>
									<FancyInput
										sMargin
										prominant
										id='price'
										name='price'
										placeholder='Start typing...'
										value={article.price}
										onChange={inputChangeHandler}
									/>
								</div>

								<div className='col-sm-6'>
									<p className='mt-2'> Category</p>
									<FancyInput
										select
										name='category'
										options={[
											...Categories.map((item) => {
												return {
													text: item.name,
													value: item.id,
												};
											}),
											{
												text: 'Select category',
												disabled: true,
												selected: true,
											},
										]}
										onChange={inputChangeHandler}
									/>
								</div>
								<div className='col-sm-6'>
									<p className='mt-2'> Cost Price</p>
									<FancyInput
										sMargin
										prominant
										id='costprice'
										name='cost'
										value={article.cost}
										placeholder='Start typing...'
										onChange={inputChangeHandler}
									/>
								</div>
								{!checked && (
								 <div className='col-sm-6'>
									<p className='mt-2'> Dimensions (W x H x L)</p>
									<FancyInput
										sMargin
										prominant
										id='dimension'
										name='dims'
										value={article.dims}
										placeholder='Start typing...'
										onChange={inputChangeHandler}
									/>
								</div>
								)}
								{!checked && (
									<div className='col-sm-6'>
									<p className='mt-2'> Waranty</p>
									<FancyInput
										sMargin
										prominant
										id='waranty'
										name='warranty'
										value={article.warranty}
										placeholder='Start typing...'
										onChange={inputChangeHandler}
									/>
								</div>
								)}

								<div className='col-sm-6'>
									<div className='d-flex align-items-start '>
										<div className='w-75'>
											<p className='mt-2'> Attachments</p>
											<FancyInput
												sMargin
												rootStyle={{ width: '100%' }}
												prominant
												type='file'
												id='img'
												name='attachment'
												label2='Upload your picture'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <button type='submit'>Add</button> */}
				</div>
			</Modal>
		</div>
	);
};

export default ModalArticle;
