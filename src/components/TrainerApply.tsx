"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import SiteSelect, { SiteMultiSelect } from "@/components/SiteSelect";
import { openings, projectById, projects } from "@/data/projects";

const subjects = [
  "Python Full Stack",
  "SCADA",
  "AI/ML",
  "MERN",
  "Java DSA",
  "Python DSA",
  "Data Analytics",
  "Power BI",
  "Excel",
  "Aptitude",
  "Cybersecurity",
];

const languages = [
  "English",
  "Hindi",
  "Assamese",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Kashmiri",
  "Konkani",
  "Malayalam",
  "Marathi",
  "Nepali",
  "Odia",
  "Punjabi",
  "Sindhi",
  "Tamil",
  "Telugu",
  "Urdu",
];

const indianCities = [
  "Agartala",
  "Agra",
  "Ahmedabad",
  "Aizawl",
  "Ajmer",
  "Allahabad",
  "Amritsar",
  "Ambala",
  "Aurangabad",
  "Banda",
  "Bengaluru",
  "Bhopal",
  "Bhubaneswar",
  "Bikaner",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Dehradun",
  "Delhi",
  "Dhanbad",
  "Faridabad",
  "Gangtok",
  "Ghaziabad",
  "Goa",
  "Gorakhpur",
  "Gurugram",
  "Guwahati",
  "Gwalior",
  "Hyderabad",
  "Imphal",
  "Indore",
  "Itanagar",
  "Jabalpur",
  "Jaipur",
  "Jalandhar",
  "Jammu",
  "Jamshedpur",
  "Jodhpur",
  "Kanpur",
  "Kochi",
  "Kohima",
  "Kolkata",
  "Kota",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Mangaluru",
  "Meerut",
  "Mumbai",
  "Mysuru",
  "Nagpur",
  "Nashik",
  "Noida",
  "Patna",
  "Puducherry",
  "Pune",
  "Raipur",
  "Rajkot",
  "Ranchi",
  "Shillong",
  "Shimla",
  "Srinagar",
  "Surat",
  "Thane",
  "Thiruvananthapuram",
  "Udaipur",
  "Vadodara",
  "Varanasi",
  "Vijayawada",
  "Visakhapatnam",
  "Warangal",
];

function projectFromProp(id?: string) {
  if (!id) return undefined;
  return projectById(id) ?? projectById(openings.find((item) => item.id === id)?.projectId ?? "");
}

export default function TrainerApply({ openingId }: { openingId?: string }) {
  const listed = useMemo(
    () =>
      projects.filter(
        (project) => project.status === "current" || project.status === "upcoming",
      ),
    [],
  );
  const preset = projectFromProp(openingId);
  const presetListed = preset && listed.some((project) => project.id === preset.id);
  const [chosenSubjects, setChosenSubjects] = useState<string[]>([]);
  const [chosenLanguages, setChosenLanguages] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [wantsOpening, setWantsOpening] = useState(presetListed ? "yes" : "no");
  const [chosenProject, setChosenProject] = useState(
    presetListed ? preset.id : (listed[0]?.id ?? ""),
  );
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!presetListed || !preset) return;
    setWantsOpening("yes");
    setChosenProject(preset.id);
  }, [preset, presetListed]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (chosenSubjects.length === 0 || chosenLanguages.length === 0) {
      setError("Choose at least one subject and one language.");
      return;
    }
    if (wantsOpening === "yes" && !chosenProject) {
      setError("Choose an opening, or mark this as a general application.");
      return;
    }
    setError("");
    setSending(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const project = wantsOpening === "yes" ? projectById(chosenProject) : undefined;
    const openingLine = project
      ? `${project.status === "current" ? "Ongoing" : "Upcoming"} — ${project.title}, ${project.campus}, ${project.city}`
      : "General application";

    data.set("subjects", chosenSubjects.join(", "));
    data.set("languages", chosenLanguages.join(", "));
    data.set("city", city);
    data.set("opening", openingLine);

    try {
      const response = await fetch("/api/apply/trainer", {
        method: "POST",
        body: data,
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setError(payload?.error || "Could not send the application.");
        return;
      }

      setSent(true);
      form.reset();
      setChosenSubjects([]);
      setChosenLanguages([]);
      setCity("");
      setWantsOpening(presetListed ? "yes" : "no");
      setChosenProject(presetListed && preset ? preset.id : (listed[0]?.id ?? ""));
    } catch {
      setError("Could not send the application. Check your connection.");
    } finally {
      setSending(false);
    }
  }

  const project = wantsOpening === "yes" ? projectById(chosenProject) : undefined;

  if (sent) {
    return (
      <p className="mt-10 text-[15px] leading-7 text-foreground">
        Application sent. We&apos;ll reply on the email you shared.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
      <Field label="Name" name="name" autoComplete="name" required />
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
      <Field label="Years teaching" name="years" inputMode="numeric" required />
      <SiteMultiSelect
        name="subjects"
        label="Subjects you teach"
        required
        values={chosenSubjects}
        onChange={setChosenSubjects}
        options={subjects.map((item) => ({ value: item, label: item }))}
      />
      <SiteMultiSelect
        name="languages"
        label="Languages"
        required
        values={chosenLanguages}
        onChange={setChosenLanguages}
        options={languages.map((item) => ({ value: item, label: item }))}
      />
      <div className="sm:col-span-2">
        <CityField value={city} onChange={setCity} />
      </div>
      <SiteSelect
        variant="field"
        name="openingMode"
        label="Opening"
        required
        value={wantsOpening}
        onChange={setWantsOpening}
        options={[
          { value: "no", label: "General application" },
          { value: "yes", label: "A specific ongoing or upcoming project" },
        ]}
      />
      {wantsOpening === "yes" ? (
        <SiteSelect
          variant="field"
          name="opening"
          label="Project"
          required
          value={chosenProject}
          onChange={setChosenProject}
          options={listed.map((item) => ({
            value: item.id,
            label: `${item.status === "current" ? "Ongoing" : "Upcoming"} · ${item.city} — ${item.title}`,
          }))}
        />
      ) : (
        <p className="self-end pb-2.5 text-sm leading-6 text-foreground/45">
          Leave this as a general application, or choose a project we are running now or opening next.
        </p>
      )}
      <label className="block sm:col-span-2">
        <Label required>Resume</Label>
        <input
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          required
          className="mt-2 w-full border border-foreground/15 bg-transparent px-3 py-2 text-sm text-foreground/70 outline-none file:mr-4 file:border-0 file:bg-transparent file:font-mono file:text-[10px] file:uppercase file:tracking-[0.16em] file:text-accent focus:border-accent"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
          Note
        </span>
        <textarea
          name="note"
          rows={4}
          placeholder={
            project
              ? `Why this seat on ${project.title} at ${project.campus}.`
              : "The subjects you teach, and where you can be on campus."
          }
          className="mt-2 w-full resize-y border border-foreground/15 bg-transparent px-3 py-2.5 text-sm leading-6 text-foreground outline-none placeholder:text-foreground/30 focus:border-accent"
        />
      </label>
      {error ? (
        <p className="text-sm text-accent sm:col-span-2" role="alert">
          {error}
        </p>
      ) : null}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="bg-accent px-5 py-2.5 text-[13px] font-medium text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {sending ? "Sending…" : "Apply"}
        </button>
      </div>
    </form>
  );
}

function CityField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const query = value.trim().toLowerCase();
  const matches = indianCities.filter((city) => city.toLowerCase().includes(query));

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <Label required>City</Label>
      <input
        name="city"
        value={value}
        required
        autoComplete="address-level2"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        placeholder="Type a city, or choose one"
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="mt-2 w-full border border-foreground/15 bg-transparent px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/30 focus:border-accent"
      />
      {open && matches.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Indian cities"
          className="absolute top-full left-0 z-[900] mt-1 max-h-64 w-full overflow-auto border border-foreground/15 bg-background py-1"
        >
          {matches.map((city) => (
            <li key={city} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={city === value}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(city);
                  setOpen(false);
                }}
                className={`flex w-full items-center px-3 py-2 text-left text-sm ${
                  city === value
                    ? "bg-accent text-on-accent"
                    : "text-foreground/75 hover:bg-foreground/[0.04] hover:text-foreground"
                }`}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Label({
  children,
  required,
}: {
  children: string;
  required?: boolean;
}) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
      {children}
      {required ? (
        <span className="ml-1 text-accent" aria-hidden="true">
          *
        </span>
      ) : null}
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  inputMode,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric";
  required?: boolean;
}) {
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        className="mt-2 w-full border border-foreground/15 bg-transparent px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent"
      />
    </label>
  );
}
