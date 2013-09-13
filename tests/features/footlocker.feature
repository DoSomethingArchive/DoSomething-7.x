Feature: Foot Locker Scholarship Application
  As a site visitor
  I can see the Foot Locker scholarship
  And I can apply and request recommendations

  Scenario: See the landing page
    Given I am on "/footlocker"
    Then I should see "Foot Locker"

  Scenario: See the About page
    Given I am on "/footlocker/about"
    Then I should see "Foot Locker"
    And I should see "The Foot Locker Scholar Athletes program honors student athletes"
    And I should see "Steps to Apply"
    And I should see "Save The Date"
    And I should see "Additional Info"

  Scenario: See the FAQ page
    Given I am on "/footlocker/faq"
    Then I should see "Foot Locker"
    And I should see "I think I’m a great candidate, what should I do?"
    And I should see "as soon as you can"

  Scenario: See the application initial page
    Given I am on "/footlocker/apply"
    Then I should see "Foot Locker"
    And I should see "About"
    And I should see "Apply"
    And I should see "FAQ"
    And I should see "Eligibility Rules"
    And I should see "What You Need"
    And I should see "Got questions?"

  Scenario: See the application status page, logged out
    Given I am on "/footlocker/apply/status"
    Then I should see "You must log in"
    And I should see "If you are having difficulty"
    And I should see "Got questions?"

  Scenario: See the application status page, logged in
    Given I am logged in as a regular user
    And I am on "/footlocker/apply/status"
    Then I should see "Application Status"
    And I should see "Welcome to your Application Status page"
    And I should see "Steps to apply:"
    And I should see "APPLICATION STATUS"
    And I should see "You haven't started yet!"
    But I should not see "REQUIRED RECOMMENDATION"
    And I should not see "RECOMMENDATION FORM"
    And I should see "If you are having difficulty"
    And I should see "Got questions?"

  Scenario: See the application page, logged out
    Given I am on "/footlocker/apply/status/application"
    Then I should see "Join DoSomething.org"
    And I should see "or register"
    And I should see "Already a member?"

  @application
  Scenario: See the application page, logged in
    Given I am logged in as a regular user
    And I am on "/footlocker/apply/status/application"
    Then I should see "Let's Get Started"

  @application
  Scenario: Fill out the application
    Given I am logged in as a regular user
    When I fill out the footlocker application

    Then I should see "Woohoo! You've successfully submitted the application!"
    And I should see "Application status: Complete"

  @requiredrec
  Scenario: Fill out Required Recommendation
    Given I am logged in as a regular user
    When I fill out the footlocker application

    Then I should see "Application status: Complete"
    And I should see "Required Recommendation: Blank"

    When I follow "rec-1"
    And I fill in the following:
      | edit-submitted-field-webform-name-und-0-value | me |
      | edit-submitted-relationship-to-you | me |
      | edit-submitted-field-webform-email-und-0-email | testing+abc123@dosomething.org |
      | edit-submitted-phone-number | 555-555-5555 |
    And I press "Submit"

    Then I should see "Required Recommendation: Sent"
    And I should see "Request pending"

  @requiredrec @rec
  Scenario: Fill out required recommendation form
    Given I am logged in as a regular user
    When I fill out the footlocker application

    Then I should see "Application status: Complete"
    And I should see "Required Recommendation: Blank"

    When I follow "rec-1"
    And I fill in the following:
      | edit-submitted-field-webform-name-und-0-value | me |
      | edit-submitted-relationship-to-you | me |
      | edit-submitted-field-webform-email-und-0-email | testing+abc123@dosomething.org |
      | edit-submitted-phone-number | 555-555-5555 |
    And I press "Submit"

    Then I should see "Required Recommendation: Sent"
    And I should see "Request pending"
    And remember the current SID

    When I go to "/footlocker/required-recommend-form" with the last SID
    Then I should see "Recommendation Form"
    And I should see "You’ve been asked"

    When I fill in the following:
      | edit-submitted-full-name | Me |
      | edit-submitted-email | testing+abc123@dosomething.org |
      | edit-submitted-phone | 555-555-5555 |
      | edit-submitted-relationship-to-student | Me |
      | edit-submitted-students-character-contributed | N/A |
    And I fill in "edit-submitted-student-character-rank" with "rank_average "
    And I fill in "edit-submitted-students-leadership-ability-rank" with "leader_average "
    And I press "Submit"

    Then I should see "Thank you for submitting your Foot Locker Scholar Athletes recommendation."

    When I go to "/footlocker/apply/status"
    Then I should see "Required Recommendation: Received"

  @optionalrec
  Scenario: Fill out Optional Recommendation
    Given I am logged in as a regular user
    When I fill out the footlocker application

    Then I should see "Application status: Complete"
    And I should see "Recommendation Form: Blank"

    When I follow "rec-2"
    And I fill in the following:
      | edit-submitted-field-webform-name-und-0-value | me |
      | edit-submitted-relationship-to-you | me |
      | edit-submitted-field-webform-email-und-0-email | testing+abc123@dosomething.org |
      | edit-submitted-phone-number | 555-555-5555 |
    And I press "Submit"

    Then I should see "Recommendation Form: Sent"
    And I should see "Request pending"

  @optionalrec @rec @oprec
  Scenario: Fill out Optional Recommendation
    Given I am logged in as a regular user
    When I fill out the footlocker application

    Then I should see "Application status: Complete"
    And I should see "Recommendation Form: Blank"

    When I follow "rec-2"
    And I fill out the foot locker recommendation form
    And I press "Submit"

    Then I should see "Recommendation Form: Sent"
    And I should see "Request pending"
    And remember the current SID

    When I go to "/footlocker/recommendation-form" with the last SID
    Then I should see "Recommendation Form"
    And I should see "You’ve been asked"

    When I fill in the following:
      | edit-submitted-full-name | Me |
      | edit-submitted-email | testing+abc123@dosomething.org |
      | edit-submitted-phone | 555-555-5555 |
      | edit-submitted-relationship-to-student | Me |
      | edit-submitted-students-character-contributed | N/A |
    And I fill in "edit-submitted-student-character-rank" with "rank_average "
    And I fill in "edit-submitted-students-leadership-ability-rank" with "leader_average "
    And I press "Submit"

    Then I should see "Thank you for submitting your Foot Locker Scholar Athletes recommendation."

    When I go to "/footlocker/apply/status"
    Then I should see "Recommendation Form: Received"
