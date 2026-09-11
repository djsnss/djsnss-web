import React, { useState, useEffect, useRef, useMemo } from "react";
import { YEARS, normalizeTeamData } from "../data/teamData";
import SectionNav from "../components/Team/SectionNav";
import CoverSlide from "../components/Team/CoverSlide";
import SingleMemberSection from "../components/Team/SingleMemberSection";
import MemberPairSection from "../components/Team/MemberPairSection";
import MemberGridSection from "../components/Team/MemberGridSection";
import "../styles/team.css";

export default function Team() {
  const [selectedYear, setSelectedYear] = useState(YEARS[0] || "2025-26");
  const [activeSection, setActiveSection] = useState("cover");
  const containerRef = useRef(null);

  // Normalized team structure for current selected year (memoized to prevent re-renders on scroll)
  const currentTeam = useMemo(() => normalizeTeamData(selectedYear), [selectedYear]);

  // Build dynamic section list for SectionNav
  const sections = [
    { id: "cover", title: "Cover" },
    ...(currentTeam?.chairperson?.name
      ? [{ id: "chairperson", title: "Chairperson" }]
      : []),
    ...(currentTeam?.viceChairpersons?.length > 0
      ? [{ id: "vice-chairpersons", title: "Vice Chairpersons" }]
      : []),
    ...(currentTeam?.secretary?.name
      ? [{ id: "secretary", title: "Secretary & Joint Sec" }]
      : []),
    ...(currentTeam?.treasurer?.name
      ? [{ id: "treasurer", title: "Treasurer & Joint Treas" }]
      : []),
    ...(currentTeam?.studentLeaders?.length > 0
      ? [{ id: "student-leaders", title: "Student Leaders" }]
      : []),
    ...(currentTeam?.departments || []).map((dept) => ({
      id: dept.id,
      title: dept.subTitle || dept.title || "Department",
    })),
  ];

  // Smooth scroll to target section by ID within our snap-container
  const handleNavigate = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // IntersectionObserver to auto-update active nav dot on scroll
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedYear, sections.length]);

  return (
    <div className="team-page-wrapper">
      {/* Fixed Right-Edge Section Dots Navigator */}
      <SectionNav
        sections={sections}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Snap Container for Full Viewport Slides */}
      <div ref={containerRef} className="snap-container relative w-full">
        {/* Slide 1: Cover Hero */}
        <CoverSlide
          years={YEARS}
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
        />

        {/* Slide 2: Chairperson */}
        {currentTeam?.chairperson?.name && (
          <SingleMemberSection
            id="chairperson"
            sectionTitle="Upper Core"
            roleTitle={currentTeam.chairperson.role || "Chairperson"}
            member={currentTeam.chairperson}
            decoration="tape"
          />
        )}

        {/* Slide 3: Vice Chairpersons */}
        {currentTeam?.viceChairpersons?.length > 0 && (
          <MemberPairSection
            id="vice-chairpersons"
            sectionTitle="Vice Chairpersons"
            members={currentTeam.viceChairpersons}
            layoutStyle="centered-title"
            decoration="pin"
            rotations={[-6, 4]}
            leafCorner="top-left-bottom-right"
          />
        )}

        {/* Slide 4: Secretary & Joint Secretary */}
        {(currentTeam?.secretaries?.primary?.members?.length > 0 || currentTeam?.secretary?.name) && (
          <MemberPairSection
            id="secretary"
            sectionTitle="Secretary"
            roleGroups={currentTeam.secretaries}
            members={[
              { ...currentTeam.secretary, role: currentTeam.secretary.role || "Secretary" },
              { ...currentTeam.jointSecretary, role: currentTeam.jointSecretary.role || "Joint Secretary" },
            ]}
            layoutStyle="split-roles"
            decoration="clip"
            rotations={[-2, 6]}
            leafCorner="top-left-bottom-right"
          />
        )}

        {/* Slide 5: Treasurer & Joint Treasurer */}
        {(currentTeam?.treasurers?.primary?.members?.length > 0 || currentTeam?.treasurer?.name) && (
          <MemberPairSection
            id="treasurer"
            sectionTitle="TREASURER"
            showTopTitle={true}
            roleGroups={currentTeam.treasurers}
            members={[
              { ...currentTeam.treasurer, role: currentTeam.treasurer.role || "Treasurer" },
              { ...currentTeam.jointTreasurer, role: currentTeam.jointTreasurer.role || "Joint Treasurer" },
            ]}
            layoutStyle="split-roles"
            decoration="pin"
            rotations={[-5, -2]}
            leafCorner="top-right-bottom-left"
          />
        )}

        {/* Slide 6: Student Leaders */}
        {currentTeam?.studentLeaders?.length > 0 && (
          <MemberGridSection
            id="student-leaders"
            sectionTitle="Student Leaders"
            members={currentTeam.studentLeaders}
            leafCorner="top-left-bottom-right"
          />
        )}

        {/* Slides 7+: Department Heads */}
        {(currentTeam?.departments || []).map((dept, index) => (
          <MemberGridSection
            key={dept.id}
            id={dept.id}
            sectionTitle={dept.title}
            subTitle={dept.subTitle}
            members={dept.members}
            leafCorner={
              index % 2 === 0
                ? "top-right-bottom-left"
                : "top-left-bottom-right"
            }
          />
        ))}
      </div>
    </div>
  );
}
