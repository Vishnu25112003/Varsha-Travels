import { useState } from "react";
import DestinationManager from "./destinations/DestinationManager.jsx";
import VehicleGalleryManager from "./gallery/VehicleGalleryManager.jsx";
import ContactSettingsManager from "./contact/ContactSettingsManager.jsx";
import ReviewManager from "./reviews/ReviewManager.jsx";
import BookingManager from "./bookings/BookingManager.jsx";
import MessageManager from "./messages/MessageManager.jsx";
import DashboardOverview from "./dashboard/DashboardOverview.jsx";
import VarshaLogo from "../assets/Varsha_Logo.png";

function DashboardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" {...props}>
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  );
}

function DestinationIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" {...props}>
      <path d="M12 2C8.7 2 6 4.7 6 8c0 4.2 6 12 6 12s6-7.8 6-12c0-3.3-2.7-6-6-6zm0 8.5A2.5 2.5 0 1 1 12 5.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function GalleryIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" {...props}>
      <rect x="3" y="3" width="18" height="14" rx="2" />
      <path d="M8 13l2.5-3 2 2.5L15 9l3 4" />
    </svg>
  );
}

function ContactIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" {...props}>
      <path d="M4 4h16v12H5l-1 4V4z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}

function ReviewIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" {...props}>
      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
    </svg>
  );
}

function BookingsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 3v4M16 3v4M4 9h16" />
    </svg>
  );
}

function MessagesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" {...props}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <path d="M8 10h8M8 14h4" />
    </svg>
  );
}

const sections = [
  { id: "Dashboard", label: "Dashboard", Icon: DashboardIcon },
  { id: "Destination", label: "Destination", Icon: DestinationIcon },
  { id: "Gallery", label: "Gallery", Icon: GalleryIcon },
  { id: "Bookings", label: "Bookings", Icon: BookingsIcon },
  { id: "Messages", label: "Messages", Icon: MessagesIcon },
  { id: "Contact", label: "Contact", Icon: ContactIcon },
  { id: "Review", label: "Review", Icon: ReviewIcon },
];

function AdminLayout({ adminEmail, onLogout }) {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Desktop: collapsed (icon-only) vs expanded sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 transform bg-white shadow-lg border-r border-slate-200 transition-all duration-200 ease-in-out overflow-y-auto ${
          isSidebarCollapsed ? "w-16" : "w-64"
        } ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="h-16 flex items-center px-3 border-b border-slate-200">
          <div className={`flex items-center w-full transition-all duration-150 ${
            isSidebarCollapsed ? "justify-center" : "gap-2"
          }`}>
            <img
              src={VarshaLogo}
              alt="Varsha Travels Logo"
              className={`h-10 w-auto object-contain transition-all duration-150 ${
                isSidebarCollapsed ? "md:h-8" : "md:h-10"
              }`}
            />
            <div className={`flex flex-col transition-opacity duration-150 ${
              isSidebarCollapsed ? "md:hidden" : "md:flex"
            }`}>
              <span className="text-sky-700 font-bold text-sm leading-tight">VARSHA</span>
              <span className="text-sky-600 font-semibold text-[10px] tracking-wide">TRAVELS</span>
            </div>
          </div>
        </div>

        {/* Admin info (desktop only, hidden when collapsed) */}
        <div
          className={`px-4 py-3 border-b border-slate-200 hidden md:block transition-opacity duration-150 ${
            isSidebarCollapsed ? "md:opacity-0 md:h-0 md:p-0 md:overflow-hidden" : "md:opacity-100"
          }`}
        >
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            Logged in as
          </p>
          <p className="text-sm font-medium text-slate-800 truncate">
            {adminEmail}
          </p>
        </div>

        <nav className="mt-4 px-2 space-y-1 pb-4">
          {sections.map(({ id, label, Icon }) => (
            <div key={id} className="relative group">
              <button
                type="button"
                onClick={() => handleNavClick(id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                  activeSection === id
                    ? "bg-sky-100 text-sky-700 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-50 text-sky-700">
                  <Icon />
                </span>
                <span
                  className={`truncate ${
                    isSidebarCollapsed ? "md:hidden" : "md:inline-block"
                  }`}
                >
                  {label}
                </span>
              </button>
              {isSidebarCollapsed && (
                <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden md:block group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 opacity-0 translate-x-1">
                  <span className="whitespace-nowrap rounded-md bg-slate-900 text-white text-xs px-2 py-1 shadow-lg">
                    {label}
                  </span>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={onLogout}
            className="w-full mt-4 flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-red-50 text-xs font-semibold text-red-600">
              
              
              
              L
            </span>
            <span
              className={`truncate ${
                isSidebarCollapsed ? "md:hidden" : "md:inline-block"
              }`}
            >
              Logout
            </span>
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`min-h-screen flex flex-col pt-0 ${
          isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                {activeSection}
              </h2>
              <p className="text-xs text-slate-500 hidden sm:block">
                Manage {activeSection.toLowerCase()} details for your travel website.
              </p>
            </div>
          </div>

          {/* Tablet/Desktop: collapse / expand sidebar toggle */}
          <button
            type="button"
            className="hidden md:inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100"
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
          >
            <span className="sr-only">Toggle sidebar width</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6"
            >
              <path d="M10 6l-4 6 4 6M14 6l4 6-4 6" />
            </svg>
          </button>
        </header>

        <main className="flex-1 px-4 sm:px-6 py-6">
          <div className="max-w-5xl mx-auto">
            {activeSection === "Dashboard" ? (
              <DashboardOverview />
            ) : activeSection === "Destination" ? (
              <DestinationManager />
            ) : activeSection === "Gallery" ? (
              <VehicleGalleryManager />
            ) : activeSection === "Bookings" ? (
              <BookingManager />
            ) : activeSection === "Messages" ? (
              <MessageManager />
            ) : activeSection === "Contact" ? (
              <ContactSettingsManager />
            ) : activeSection === "Review" ? (
              <ReviewManager />
            ) : (
              <DefaultSectionContent
                activeSection={activeSection}
                adminEmail={adminEmail}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function DefaultSectionContent({ activeSection, adminEmail }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {activeSection} Section
      </h3>
      <p className="text-sm text-slate-500 mb-4">
        This is a placeholder for the <span className="font-medium lowercase">{activeSection}</span> management area. You can connect this to your existing user pages later.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm text-slate-600">
        <div className="p-3 rounded-lg bg-slate-50">
          <p className="font-medium text-slate-800 mb-1">Coming soon</p>
          <p className="text-xs text-slate-500">
            Add forms and tables here to control what users see on the travels website.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-slate-50">
          <p className="font-medium text-slate-800 mb-1">Mobile friendly</p>
          <p className="text-xs text-slate-500">
            Resize the window to see the responsive sidebar and layout for mobile and tablet devices.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 sm:col-span-2 lg:col-span-1">
          <p className="font-medium text-slate-800 mb-1">Admin email</p>
          <p className="text-xs text-slate-500">
            Logged in as <span className="font-mono">{adminEmail}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
