import { CABINET_ROUTE, EVENT_ROUTE, LOGIN_ROUTE, MEDICAL_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";
import Cabinet from "./pages/Cabinet";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import MedicalRecordForm from "./components/MedicalRecordForm";
import EventPage from "./pages/EventPage";

export const authRoutes = [
	{
		path: CABINET_ROUTE,
		Component: Cabinet
	},
	{
		path: MEDICAL_ROUTE,
		Component: MedicalRecordForm
	},
	{
		path: EVENT_ROUTE,
		Component: EventPage
	}
]

export const publicRoutes = [
	{
		path: REGISTRATION_ROUTE,
		Component: Registration
	},
	{
		path: LOGIN_ROUTE,
		Component: Login
	}
]
