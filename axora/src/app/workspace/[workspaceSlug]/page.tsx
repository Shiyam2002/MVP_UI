import { WorkspaceCanvas } from "@/src/components/workspace/workspace-canvas";



export default function Page() {

    // 🔥 TEMP MOCK (later fetch by slug)
    const workspace = {
        name: "Contract Review – Q4",
        description: "Legal risk analysis for vendor contracts",
    };

    return (
        <div className="min-h-screen w-full bg-muted/30">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <WorkspaceCanvas
                    workspaceName={workspace.name}
                    description={workspace.description}
                    chatRooms={[
                        { id: "1", name: "Risk Analysis" },
                        { id: "2", name: "Clause Review" },
                    ]}
                    documents={[
                        { id: "1", name: "NDA.pdf" },
                        { id: "2", name: "MSA.docx" },
                    ]}
                    insights={[
                        { id: "1", title: "Termination clause allows early exit" },
                    ]}
                />
            </div>
        </div>
    );
}
