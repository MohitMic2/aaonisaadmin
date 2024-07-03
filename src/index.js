import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import SalesmenScreen from 'components/SalesmenReffer/SalesmenScreen/SalesmenScreen';
import EditListing from 'components/AllListing/EditListing';
import EditJSCategory from 'components/AllJSCategory/EditJSCategory';
import EditJDCategory from 'components/AllJDCategory/EditJdCategory';
import EditHashtags from 'components/AllHashtags/EditHashtags';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<HashRouter>
					<Switch>
						<Route path={`/auth`} component={AuthLayout} />
						<Route path={`/admin`} component={AdminLayout} />
						<Route path={`/edit/:id`} component={EditListing} />
						<Route path={`/editjscategory/:id`} component={EditJSCategory} />
						<Route path={`/editjdcategory/:id`} component={EditJDCategory} />
						<Route path={`/edithashtags/:id`} component={EditHashtags} />
						<Route path={`/rtl`} component={RtlLayout} />
						<Redirect from='/' to='/admin/login' />
					</Switch>
				</HashRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
