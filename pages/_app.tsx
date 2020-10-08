import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import 'styles/global.scss'

const App = ({ Component, pageProps }: AppProps) => (
	<>
		<Component {...pageProps} />
		<ToastContainer />
	</>
)

export default App
