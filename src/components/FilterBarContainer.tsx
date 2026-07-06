import { FilterBar } from "@/components/FilterBar";
import { getDepartmentOptions, getDoctorOptions } from "@/lib/queries/finance";

const PATIENT_TYPES = ["General Patient", "General Customer", "Daycare Patient", "HN Card Patient"];
const PAYMENT_STATUSES = ["paid", "partial", "due", "refunded"];

export async function FilterBarContainer() {
  const [departments, doctors] = await Promise.all([getDepartmentOptions(), getDoctorOptions()]);
  return (
    <FilterBar
      departments={departments}
      doctors={doctors}
      patientTypes={PATIENT_TYPES}
      paymentStatuses={PAYMENT_STATUSES}
    />
  );
}
