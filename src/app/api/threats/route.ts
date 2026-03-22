import { NextResponse } from "next/server";

export const revalidate = 3600; // cache 1h

export interface CisaVulnerability {
    cveID: string;
    vendorProject: string;
    product: string;
    vulnerabilityName: string;
    dateAdded: string;
    shortDescription: string;
    knownRansomwareCampaignUse: string;
}

export async function GET() {
    try {
        const res = await fetch(
            "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
            { next: { revalidate: 3600 } }
        );

        if (!res.ok) {
            return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
        }

        const data = await res.json();

        // Retourner les 6 plus récentes (déjà triées par dateAdded desc)
        const latest: CisaVulnerability[] = data.vulnerabilities
            .slice(0, 6)
            .map((v: CisaVulnerability) => ({
                cveID: v.cveID,
                vendorProject: v.vendorProject,
                product: v.product,
                vulnerabilityName: v.vulnerabilityName,
                dateAdded: v.dateAdded,
                shortDescription: v.shortDescription,
                knownRansomwareCampaignUse: v.knownRansomwareCampaignUse,
            }));

        return NextResponse.json({ vulnerabilities: latest, total: data.count });
    } catch {
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
