import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-orange-50 to-amber-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="min-h-full flex flex-col">
          <div className="flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <p className="text-6xl font-extrabold text-orange-600 sm:text-7xl">404</p>
              <h1 className="mt-4 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">Page not found</h1>
              <p className="mt-4 text-lg text-gray-500">
                Sorry, we couldn't find the page you're looking for.
              </p>
              <div className="mt-10">
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Go back home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFound