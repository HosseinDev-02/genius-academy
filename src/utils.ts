const scrollToSection = (sectionId: string): void => {
    if (!sectionId) return;
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

export { scrollToSection };