
import "./TemplateDetails.css";

function TemplateDetails({ template, isFavorite, onToggleFavorite, onClose }) {
    if (!template) return null;

    return (
        <div className="details-backdrop" onClick={onClose}>
            <section
                className="details-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="details-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="details-close"
                    type="button"
                    onClick={onClose}
                    aria-label="Close details"
                >
                    ×
                </button>

                <div className="details-preview">
                    <span className="details-preview-label">{template.category}</span>

                    <div className="details-art">
                        <div className="details-window">
                            <div className="details-window-top">
                                <i />
                                <i />
                                <i />
                            </div>

                            <div className="details-window-content">
                                <div className="details-sidebar" />
                                <div className="details-main">
                                    <div className="details-heading-line" />
                                    <div className="details-text-line" />
                                    <div className="details-text-line short" />
                                    <div className="details-block-row">
                                        <i />
                                        <i />
                                        <i />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="details-content">
                    <span className="details-category">{template.category}</span>

                    <h2 id="details-title">{template.name}</h2>

                    <p className="details-description">{template.description}</p>

                    <div className="details-meta">
                        <span>StackStore collection</span>
                        <span>Template #{String(template._id).slice(-6)}</span>
                    </div>

                    <button
                        type="button"
                        className={`details-favorite ${isFavorite ? "is-favorite" : ""
                            }`}
                        onClick={() => onToggleFavorite(template._id)}
                    >
                        {isFavorite ? "♥ Saved to favorites" : "♡ Add to favorites"}
                    </button>

                    <button
                        type="button"
                        className="details-done"
                        onClick={onClose}
                    >
                        Back to templates
                    </button>
                </div>
            </section>
        </div>
    );
}

export default TemplateDetails;
