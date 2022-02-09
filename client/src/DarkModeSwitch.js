import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function DarkModeSwitch() {
    const [enabled, setEnabled] = useState(localStorage.getItem("theme") === "dark" ? true : false);

    function handleChange() {
        localStorage.setItem("theme", !enabled ? "dark" : "light");
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.getElementById("root").classList.add('dark')
        } else {
            document.getElementById("root").classList.remove('dark')
        }
    }

    return (
        <Switch.Group>
            <div className="flex items-center">
                <Switch.Label className="mr-4" passive>Toggle {localStorage.getItem("theme") === "light" ? "Dark" : "Light"} Mode</Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={() => {
                        setEnabled(!enabled);
                        handleChange();
                    }}
                    className={`${enabled ? 'bg-gray-500' : 'bg-gray-900'
                        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    <span
                        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    );
}